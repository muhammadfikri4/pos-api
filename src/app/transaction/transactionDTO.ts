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

export interface WebhookMidtransTransactionBodyDTO {
    transaction_type?: string,
    transaction_time?: string,
    transaction_status?: string,
    transaction_id?: string,
    status_message?: string,
    status_code?: string,
    signature_key?: string,
    settlement_time?: string,
    reference_id?: string,
    payment_type?: string,
    order_id?: string,
    merchant_id?: string,
    issuer?: string,
    gross_amount?: string,
    fraud_status?: string,
    expiry_time?: string,
    currency?: string,
    acquirer?: string

}