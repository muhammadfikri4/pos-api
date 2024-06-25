import { StatusTransaction } from "@prisma/client";
import { getProductById } from "app/product/productRepo";
import prisma from "../../config";
import {
  PaymentMethod,
  TransactionBodyDTO,
  TransactionDetailDTO,
} from "./transactionDTO";
import { IFilterTransaction } from "./transactionTypes";

export const createTransaction = async ({
  name,
  details,
  email,
  paymentMethod,
}: TransactionBodyDTO) => {
  // const totalAmount = details?.reduce((acc, curr) => (acc) + (curr?.amount * curr?.quantity as number), 0) as number
  const amounts = await Promise.all(
    details?.map(async (detail) => {
      const findProduct = await getProductById(detail.productId);
      return (findProduct?.price as number) * (detail?.quantity as number);
    }) || []
  );
  const totalAmount = amounts.reduce((acc, curr) => acc + curr, 0);
  const totalQuantity = details?.reduce(
    (acc, curr) => acc + (curr?.quantity as number),
    0
  ) as number;
  return await prisma.transaction.create({
    data: {
      name: name as string,
      email: email as string,
      paymentMethod: paymentMethod as PaymentMethod,
      totalAmount,
      totalQuantity,
      totalPaid: 0,
      totalReturn: 0,
      status: "UNPAID",
    },
  });
};

export const createTransactionDetail = async ({
  details,
}: TransactionBodyDTO) => {
  return await prisma.transactionDetail.createMany({
    data: details as TransactionDetailDTO[],
  });
};

export const getTransaction = async ({
  page,
  perPage,
  email,
  name,
}: IFilterTransaction) => {
  return await prisma.transaction.findMany({
    where: {
      email: {
        contains: email,
      },
      name: {
        contains: name,
      },
    },
    include: {
      transactionDetails: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
    take: perPage,
    skip: (Number(page) - 1) * Number(perPage),
  });
};

export const getTransactionCount = async ({
  name,
  email,
}: IFilterTransaction) => {
  return await prisma.transaction.count({
    where: {
      name: {
        contains: name,
      },
      email: {
        contains: email,
      },
    },
  });
};

export const getTransactionDetailByTransactionId = async (
  transactionId: string
) => {
  return await prisma.transactionDetail.findMany({
    where: {
      transactionId,
    },
  });
};

export const updateStatusTransaction = async (
  transactionId: string,
  status: StatusTransaction,
  settlementTime?: string,
  signatureKey?: string
) => {
  return await prisma.transaction.update({
    where: {
      id: transactionId,
    },
    data: {
      status,
      settlementTime: settlementTime ? settlementTime : null,
      signatureKey: signatureKey ? signatureKey : null,
    },
  });
};

export const getTransactionById = async (id: string) => {
  return await prisma.transaction.findUnique({
    where: {
      id,
    },
    include: {
      transactionDetails: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
};

export const getTransactionDetailById = async (id: string) => {
  return await prisma.transactionDetail.findUnique({
    where: {
      id,
    },
  });
};

export const createHistoryBaseOnTransaction = (
  transactionId: string,
  status: StatusTransaction
) => {
  return prisma.history.create({
    data: {
      status,
      transactionId,
    },
  });
};

export const getHistoryByTransactionId = (transactionId: string) => {
  return prisma.history.findMany({
    where: {
      transactionId: transactionId,
    },
  });
};

export const createIncomeByTransaction = (
  transactionId: string,
  nominal: number
) => {
  return prisma.income.create({
    data: {
      nominal,
      transactionId,
    },
  });
};

export const updatePaymentTransaction = async (
  transactionId: string,
  totalPaid: number,
  totalAmount: number
) => {
  return await prisma.transaction.update({
    where: {
      id: transactionId,
    },
    data: {
      totalPaid,
      totalReturn: totalAmount - totalPaid,
      status: "PAID",
      settlementTime: new Date().toISOString(),
    },
  });
}