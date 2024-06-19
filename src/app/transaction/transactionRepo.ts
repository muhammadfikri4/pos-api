import { StatusTransaction } from "@prisma/client";
import prisma from "../../config";
import { PaymentMethod, TransactionBodyDTO, TransactionDetailDTO } from "./transactionDTO";
import { IFilterTransaction } from "./transactionTypes";

export const createTransaction = async ({ name, details, email, paymentMethod }: TransactionBodyDTO) => {
    const totalAmount = details?.reduce((acc, curr) => (acc) + (curr?.amount * curr?.quantity as number), 0) as number
    const totalQuantity = details?.reduce((acc, curr) => acc + (curr?.quantity as number), 0) as number
    return await prisma.transaction.create({
        data: {
            name: name as string,
            email: email as string,
            paymentMethod: paymentMethod as PaymentMethod,
            totalAmount,
            totalQuantity,
            status: "UNPAID",
        }
    })
}

export const createTransactionDetail = async ({ details }: TransactionBodyDTO) => {
    return await prisma.transactionDetail.createMany({
        data: details as TransactionDetailDTO[]
    })
}

export const getTransaction = async ({ page, perPage, email, name }: IFilterTransaction) => {
    return await prisma.transaction.findMany({
        where: {
            email: {
                contains: email
            },
            name: {
                contains: name
            }
        },
        include: {
            transactionDetails: {
                include: {
                    product: {
                        include: {
                            category: true
                        }
                    }
                }
            }
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)
    })
}

export const getTransactionCount = async ({ name, email }: IFilterTransaction) => {
    return await prisma.transaction.count({
        where: {
            name: {
                contains: name
            },
            email: {
                contains: email
            }
        }
    })

}

export const getTransactionDetailByTransactionId = async (transactionId: string) => {
    return await prisma.transactionDetail.findMany({
        where: {
            transactionId
        }
    })
}

export const updateStatusTransaction = async (transactionId: string, status: StatusTransaction) => {
    return await prisma.transaction.update({
        where: {
            id: transactionId
        },
        data: {
            status
        }
    })
}

export const getTransactionById = async (id: string) => {
    return await prisma.transaction.findUnique({
        where: {
            id
        },
        include: {
            transactionDetails: true
        }
    })
}

export const getTransactionDetailById = async (id: string) => {
    return await prisma.transactionDetail.findUnique({
        where: {
            id
        }
    })
}