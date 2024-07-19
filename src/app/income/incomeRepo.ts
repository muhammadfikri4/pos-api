import prisma from "../../config"
import { IFilterIncome } from "./incomeTypes"

export const getIncomeByTransactionId = async (transactionId: string) => {
    return await prisma.income.findMany({
        where: {
            transactionId
        }
    })
}

export const getAllIncome = async ({ page, perPage, endDate, startDate }: IFilterIncome) => {

    return await prisma.income.findMany({
        where: {
            createdAt: {
                gte: startDate,
                lte: endDate,
            },
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            transaction: true
        },
        take: perPage,
        skip: (Number(page) - 1) * Number(perPage)

    })
}

export const getIncomeCounts = async ({ date }: IFilterIncome) => {
    return await prisma.income.count({
        where: {
            createdAt: {
                equals: date
            },
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}