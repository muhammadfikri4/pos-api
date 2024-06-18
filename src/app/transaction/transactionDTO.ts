type Status = "UNPAID" | "PAID"

export interface TransactionBodyDTO {
    id?: string
    customerName?: string
    customerEmail?: string
    customerId?: string
    totalAmount?: number
    productId?: string
    quantity?: number
    status?: Status
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