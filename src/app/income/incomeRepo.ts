import prisma from "../../config"
import { IFilterIncome } from "./incomeTypes"

export const getIncomeByTransactionId = async (transactionId: string) => {
    return await prisma.income.findMany({
        where: {
            transactionId
        }
    })
}

export const getAllIncome = async ({ page, perPage, from, to }: IFilterIncome) => {
    return await prisma.income.findMany({
        where: {
            createdAt: {
                gt: from,
                lt: to,
            },
        },
        include: {
            transaction: true
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)

    })
}

export const getIncomeCounts = async ({ from, to }: IFilterIncome) => {
    return await prisma.income.count({
        where: {
            createdAt: {
                gt: from,
                lt: to
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}