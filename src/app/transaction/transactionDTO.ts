export type Status = "UNPAID" | "PAID"
export type PaymentMethod = "QRIS" | "CASH"

export interface TransactionDetailDTO {
    productId: string,
    quantity: number,
    transactionId: string
}
export interface TransactionBodyDTO {
    id?: string
    name?: string
    email?: string
    status?: Status
    totalQuantity?: number
    totalAmount?: number
    paymentMethod?: PaymentMethod
    details?: TransactionDetailDTO[]
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