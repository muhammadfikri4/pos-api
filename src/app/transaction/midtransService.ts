import { ENV } from "libs";
import Midtrans from "midtrans-client";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: ENV.MIDTRANS_SERVER_KEY as string,
  clientKey: ENV.MIDTRANS_CLIENT_KEY as string,
});

export const createMidtransTransaction = async (
  transaction: any,
  details: any,
  name: string,
  email: string
) => {
  
  const parameter = {
    transaction_details: {
      order_id: transaction.id,
      gross_amount: transaction.totalAmount,
    },
    customer_details: {
      name: name,
      email,
    },
    payment_type: "qris",
  };

  
  
  try {
    const midtransTransaction = await snap.createTransaction(parameter);
    return {
      token: midtransTransaction.token,
      redirect_url: midtransTransaction.redirect_url,
    };
  } catch (error) {
    console.error("Error creating Midtrans transaction:", error);
    return {
      statusCode: 500,
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create Midtrans transaction",
    };
  }
};
