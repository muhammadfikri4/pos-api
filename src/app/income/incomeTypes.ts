import { PaymentMethod } from "@prisma/client"

export interface IFilterIncome {
    page?: number,
    perPage?: number,
    date?: string | Date,
    startDate?: string | Date,
    endDate?: string | Date
}

export interface IncomeModelTypes {
    id: string
    nominal: number
    transaction: {
        id: string,
        name: string,
        paymentMethod: PaymentMethod,
        settlementTime: string,
        totalAmount: number,
        totalQuantity: number
    }
    createdAt: Date
}