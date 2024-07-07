// import BTSerialPort from "bluetooth-serial-port";
// import { MESSAGE_CODE } from "../../utils/ErrorCode";
// import { AppError } from "../../utils/HttpError";
// import { MESSAGES } from "../../utils/Messages";
// import { getTransactionById } from "./transactionRepo";

// export const printTransactionService = async (id: string) => {
//   const transaction = await getTransactionById(id);
//   if (!transaction) {
//     return AppError(
//       MESSAGES.ERROR.NOT_FOUND.TRANSACTION,
//       404,
//       MESSAGE_CODE.NOT_FOUND
//     );
//   }

//   if (transaction.status !== "PAID") {
//     return AppError(
//       MESSAGES.ERROR.INVALID.STATUS,
//       400,
//       MESSAGE_CODE.BAD_REQUEST
//     );
//   }

//   interface IFormatDate {
//     year: "numeric" | "2-digit";
//     month: "numeric" | "2-digit" | "long" | "short" | "narrow";
//     day: "numeric" | "2-digit";
//   }

//   interface IFormatTime {
//     hour: "numeric" | "2-digit";
//     minute: "numeric" | "2-digit";
//   }

//   function formatDate(isoDate: Date) {
//     const date = new Date(isoDate);

//     const optionsDate: IFormatDate = {
//       year: "numeric",
//       month: "long",
//       day: "2-digit",
//     };

//     const optionsTime: IFormatTime = {
//       hour: "2-digit",
//       minute: "2-digit",
//     };

//     const formattedDate = date.toLocaleDateString("id-ID", optionsDate);
//     const formattedTime = date.toLocaleTimeString("id-ID", optionsTime);

//     return `${formattedDate}, ${formattedTime}`;
//   }

//   const formatRupiah = (number: number) => {
//     return `Rp${number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
//   };

//   const generateReceipt = () => {
//     const ESC = "\x1B"; // ESC byte in hex notation
//     const GS = "\x1D"; // GS byte in hex notation

//     const initializePrinter = ESC + "@"; // Initialize printer
//     const doubleSizeText = GS + "!" + "\x04"; // Double size text
//     const normalSizeText = GS + "!" + "\x00"; // Normal size text
//     const boldOn = ESC + "E" + "\x01"; // Bold on
//     const boldOff = ESC + "E" + "\x00"; // Bold off
//     const underlineOn = ESC + "-" + "\x01"; // Underline on
//     const underlineOff = ESC + "-" + "\x00"; // Underline off

//     const lineSeparator = "--------------------------------";
//     const tearLine = " - - - - - - - - - - - - - - - -";

//     const receipt = [];
//     receipt.push(initializePrinter);
//     receipt.push(doubleSizeText + "POS Product Receipt" + normalSizeText);
//     receipt.push(lineSeparator);
//     receipt.push(`Tanggal: ${formatDate(transaction.createdAt as Date)}`);
//     receipt.push(`Serial: ${transaction.serialNumber}`);
//     receipt.push(`Name: ${transaction.name}`);
//     receipt.push(`Email: ${transaction.email}`);
//     receipt.push(lineSeparator);
//     receipt.push(boldOn + "Item");
//     receipt.push("Qty    Price         Total" + boldOff);
//     receipt.push(lineSeparator);

//     transaction.transactionDetails.forEach((product) => {
//       const totalPrice = product.product.price * product.quantity;
//       receipt.push(`${product.product.name}`);
//       receipt.push(
//         `${product.quantity.toString().padStart(2)}  ${formatRupiah(product.product.price).padStart(9)}  ${formatRupiah(totalPrice).padStart(9)}`
//       );
//     });

//     receipt.push(lineSeparator);
//     receipt.push(
//       `Total:           ${formatRupiah(transaction.totalAmount).padStart(9)}`
//     );
//     receipt.push(
//       `Cash:            ${formatRupiah(transaction.totalPaid).padStart(9)}`
//     );
//     receipt.push(
//       `Change:          ${formatRupiah(transaction.totalReturn).padStart(9)}`
//     );
//     receipt.push(lineSeparator);
//     receipt.push(
//       underlineOn + "Terima kasih telah berbelanja di Toko kami!" + underlineOff
//     );
//     receipt.push("Selalu dekat, selalu ada.");
//     receipt.push("");
//     receipt.push("");
//     receipt.push(tearLine);
//     receipt.push("");
//     receipt.push("");
//     receipt.push(doubleSizeText + "Kitchen Receipt" + normalSizeText);
//     receipt.push(lineSeparator);
//     receipt.push(`Tanggal: ${formatDate(transaction.createdAt as Date)}`);
//     receipt.push(`Serial: ${transaction.serialNumber}`);
//     receipt.push(lineSeparator);
//     receipt.push("Item                        Qty");
//     receipt.push(lineSeparator);

//     transaction.transactionDetails.forEach((product) => {
//       receipt.push(`${product.product.name.padEnd(26).substring(0, 26)} ${product.quantity
//         .toString()
//         .padStart(3)}
//       `);
//     });
//     receipt.push(lineSeparator);

//     return receipt.join("\n");
//   };

//   let btSerial = new BTSerialPort.BluetoothSerialPort();

//   btSerial.findSerialPortChannel(
//     "86:67:7A:55:BA:17",
//     function (channel) {
//       btSerial.connect(
//         "86:67:7A:55:BA:17",
//         channel,
//         function () {
//           // Generate receipt content
//           const receiptContent = generateReceipt();

//           // Create print commands
//           const encoder = new TextEncoder();
//           let printCommands = encoder.encode(receiptContent + "\n\n\n\n");

//           // Write commands to printer
//           btSerial.write(
//             printCommands as any,
//             function (err: any, bytesWritten?: any) {
//               if (err) {
//                 return AppError(
//                   MESSAGES.ERROR.PRINT,
//                   500,
//                   MESSAGE_CODE.INTERNAL_SERVER_ERROR
//                 );
//               }
//               btSerial.close();
//             }
//           );
//         },
//         function () {
//           return AppError(
//             MESSAGES.ERROR.BLUETOOTH,
//             500,
//             MESSAGE_CODE.INTERNAL_SERVER_ERROR
//           );
//         }
//       );
//     },
//     // function () {
//     //   return AppError(
//     //     MESSAGES.ERROR.BLUETOOTH,
//     //     500,
//     //     MESSAGE_CODE.INTERNAL_SERVER_ERROR
//     //   );
//     // }
//   );
// };
