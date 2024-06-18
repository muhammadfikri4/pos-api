export type Status = "UNPAID" | "PAID"
export type PaymentMethod = "QRIS" | "BCA" | "MANDIRI" | "CASH"

export interface TransactionDetailDTO {
    productId: string,
    quantity: number,
    amount: number,
    transactionId: string
}
export interface TransactionBodyDTO {

    name?: string
    email?: string
    status?: Status
    totalQuantity?: number
    totalAmount?: number
    paymentMethod?: PaymentMethod
    details: TransactionDetailDTO[]
}

export interface TransactionModel {
    data?: TransactionBodyDTO[]
}

export interface CustomerBodyDTO {
    name?: string
    email?: string
    numberPhone?: number
}

export interface IncomeBodyDTO {
    id?: string,
    nominal?: number
}