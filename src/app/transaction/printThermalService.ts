import escpos from "escpos";
import { TransactionDetailModelTypes, TransactionModelTypes } from "./transactionTypes";

// const usbDevice = new escpos.USB();
// const usbPrinter = new escpos.Printer(usbDevice);

// const serialDevice = new escpos.Serial('/dev/usb/lp0');
// const serialPrinter = new escpos.Printer(serialDevice);

// const bluetoothDevice = new escpos.Bluetooth('01:23:45:67:89:AB', 1);
// const bluetoothPrinter = new escpos.Printer(bluetoothDevice);

// const networkDevice = new escpos.Network('localhost');
// const networkPrinter = new escpos.Printer(networkDevice);
interface IFormatDate {
    year: "numeric" | "2-digit";
    month: "numeric" | "2-digit" | "long" | "short" | "narrow";
    day: "numeric" | "2-digit";
}

interface IFormatTime {
    hour: "numeric" | "2-digit";
    minute: "numeric" | "2-digit";
}
function formatDate(isoDate: Date) {
    const date = new Date(isoDate);

    const optionsDate: IFormatDate = {
        year: "numeric",
        month: "long",
        day: "2-digit",
    };

    const optionsTime: IFormatTime = {
        hour: "2-digit",
        minute: "2-digit",
    };

    const formattedDate = date.toLocaleDateString("id-ID", optionsDate);
    const formattedTime = date.toLocaleTimeString("id-ID", optionsTime);

    return `${formattedDate}, ${formattedTime}`;
}

const formatRupiah = (number: number) => {
    return `Rp${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

export const printCustomerReceipt = (order: TransactionModelTypes) => {
    const device = new escpos.Bluetooth("01:23:45:67:89:AB", 1);
    const printer = new escpos.Printer(device, { encoding: "GB18030" });

    device.open((error: Error) => {
        if (error) {
            console.error("Printer open error:", error);
            return;
        }

        printer
            .font("A")
            .align("LT")
            .style("B")
            .size(1, 1)
            .text("POS Product Receipt")
            .text("----------------------------------------------------")
            .text(`Tanggal: ${formatDate(order.createdAt as Date)}`)
            .text(`Serial: ${order.serialNumber}`)
            .text(`Name: ${order.name}`)
            .text(`Email: ${order.email}`)
            .text("----------------------------------------------------")
            .text("Item                       Qty   Price    Total")
            .text("----------------------------------------------------");

        order.transactionDetails?.forEach((item: TransactionDetailModelTypes) => {
            const totalPrice = item.product?.price as number * item.quantity;
            printer.text(
                `${(item.product?.name as string).padEnd(25).substring(0, 25)} ${item.quantity
                    .toString()
                    .padStart(3)}  ${formatRupiah(item.product?.price as number).padStart(
                        8
                    )}  ${formatRupiah(totalPrice).padStart(8)}`
            );
        });

        printer
            .text("----------------------------------------------------")
            .text(
                `Total:                                  ${formatRupiah(
                    order.totalAmount as number
                ).padStart(8)}`
            )
            .text(
                `Cash:                                    ${formatRupiah(
                    order.totalPaid as number
                ).padStart(8)}`
            )
            .text(
                `Change:                                  ${formatRupiah(
                    order.totalReturn as number
                ).padStart(8)}`
            )
            .text("----------------------------------------------------")
            .text("Terima kasih telah berbelanja di Indomaret!")
            .text("Selalu dekat, selalu ada.")
            .cut()
            .close();
    });
};

export const printKitchenReceipt = (order: TransactionModelTypes) => {
    const device = new escpos.Bluetooth("86:67:7A:55:BA:17", 1);
    const printer = new escpos.Printer(device, { encoding: "GB18030" });

    device.open((error: Error) => {
        if (error) {
            console.error("Printer open error:", error);
            return;
        }

        printer
            .font("A")
            .align("LT")
            .style("B")
            .size(1, 1)
            .text("POS Product Receipt")
            .text("----------------------------------------------------")
            .text("Kitchen Receipt")
            .text(`Tanggal: ${formatDate(order.createdAt as Date)}`)
            .text(`Serial: ${order.serialNumber}`)
            .text(`Name: ${order.name}`)
            .text("----------------------------------------------------")
            .text("Item                                        Qty")
            .text("----------------------------------------------------");

        order.transactionDetails?.forEach((item: TransactionDetailModelTypes) => {
            printer.text(
                `${(item.product?.name as string).padEnd(42).substring(0, 42)} ${item.quantity
                    .toString()
                    .padStart(3)}`
            );
        });

        printer.cut().close();
    });
};

export const handlePrint: (transaction: TransactionModelTypes) => void = (transaction) => {
    console.log("Transaction:", transaction);

    // printCustomerReceipt(transaction);
    // printKitchenReceipt(transaction);
};
