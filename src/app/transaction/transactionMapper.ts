import { TransactionModelTypes } from "./transactionTypes";

export const getTransactionsMapper = (
  transactions: TransactionModelTypes[]
) => {
  return transactions.map((transaction) => {
    const {
      id,
      name,
      email,
      paymentMethod,
      status,
      totalQuantity,
      totalAmount,
      createdAt,
      updatedAt,
      transactionDetails,
      serialNumber,
      settlementTime,
      signatureKey,
    } = transaction;
    return {
      id,
      name,
      email,
      paymentMethod,
      status,
      serialNumber,
      settlementTime,
      signatureKey,
      totalQuantity,
      totalAmount,
      createdAt,
      updatedAt,
      transactionDetails: transactionDetails?.map((detail) => {
        const { id, quantity, amount, product, createdAt, updatedAt } = detail;
        return {
          id,
          quantity,
          amount,
          product: {
            id: product.id,
            name: product.name,
            image: product.image,
            category: {
              id: product.category.id,
              name: product.category.name,
            },
          },
          createdAt,
          updatedAt,
        };
      }),
    };
  });
};

export const getTransactionByIdMapper = (
  transaction: TransactionModelTypes
): TransactionModelTypes => {
  const {
    id,
    name,
    email,
    paymentMethod,
    status,
    totalQuantity,
    totalAmount,
    createdAt,
    updatedAt,
    transactionDetails,
    serialNumber,
    settlementTime,
    signatureKey,
  } = transaction;
  return {
    id,
    name,
    email,
    paymentMethod,
    status,
    serialNumber,
    settlementTime,
    signatureKey,
    totalQuantity,
    totalAmount,
    createdAt,
    updatedAt,
    transactionDetails: transactionDetails?.map((detail) => {
      const { id, quantity, amount, product, createdAt, updatedAt } = detail;
      return {
        id,
        quantity,
        amount,
        product: {
          id: product.id,
          name: product.name,
          image: product.image,
          category: {
            id: product.category.id,
            name: product.category.name,
          },
        },
        createdAt,
        updatedAt,
      };
    }),
  };
};
