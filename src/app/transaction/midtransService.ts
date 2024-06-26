import { getProductById } from "app/product/productRepo";
import Midtrans from "midtrans-client";
import { ENV } from "../../libs";
import { TransactionBodyDTO, TransactionDetailDTO } from "./transactionDTO";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: ENV.MIDTRANS_SERVER_KEY as string,
  clientKey: ENV.MIDTRANS_CLIENT_KEY as string,
});

export const createMidtransTransaction = async (
  transaction: TransactionBodyDTO,
  details: TransactionDetailDTO[],
  name: string,
  email: string
) => {

  const parameter = {
    transaction_id: transaction.id,
    transaction_details: {
      order_id: transaction.id,
      gross_amount: transaction.totalAmount,
    },
    customer_details: {
      name: name,
      email,
    },
    item_details: await Promise.all(details.map(async (item: TransactionDetailDTO) => {
      const getById = await getProductById(item.productId)
      return {
        id: item?.productId,
        price: getById?.price,
        quantity: item.quantity,
        name: getById?.name
      }
    })),
    payment_type: "qris",
  };



  try {
    const midtransTransaction = await snap.createTransaction(parameter);
    return {
      token: midtransTransaction.token,
      redirect_url: `${midtransTransaction.redirect_url}#/other-qris`,
    };
  } catch (error: any) {
    console.error("Error creating Midtrans transaction:", error);
    return {
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create Midtrans transaction"
    };
  }
};
