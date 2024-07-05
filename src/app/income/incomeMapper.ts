import { IncomeModelTypes } from "./incomeTypes";

export const incomeMapper = (incomes: IncomeModelTypes[]): IncomeModelTypes[] => {
    return incomes.map(item => ({
        id: item.id,
        nominal: item.nominal,
        transaction: {
            id: item.transaction.id,
            name: item.transaction.name,
            paymentMethod: item.transaction.paymentMethod,
            settlementTime: item.transaction.settlementTime,
            totalAmount: item.transaction.totalAmount,
            totalQuantity: item.transaction.totalQuantity
        },
        createdAt: item.createdAt
    }))
}