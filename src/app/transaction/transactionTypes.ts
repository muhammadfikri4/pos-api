import { PaymentMethod, StatusTransaction } from "@prisma/client"

export interface CategoryProductModelTypes {
    id: string,
    name: string
}

export interface ProductTransactionModelTypes {
    id: string,
    name: string,
    price: number,
    image: string,
    stock: number,
    category: {
        id: string,
        name: string,
    }
}

export interface TransactionDetailModelTypes {
    id: string,
    quantity: number,
    amount: number,
    product: ProductTransactionModelTypes
    createdAt: Date,
    updatedAt: Date,
}

export interface TransactionModelTypes {
    id: string,
    name: string,
    email: string,
    status: StatusTransaction,
    paymentMethod: PaymentMethod,
    totalQuantity: number,
    totalAmount: number,
    settlementTime: string,
    signatureKey: string,
    serialNumber: number,
    transactionDetails: TransactionDetailModelTypes[],
    createdAt: Date,
    updatedAt: Date
}

export interface IFilterTransaction {
    page?: number,
    perPage?: number,
    name?: string,
    email?: string
}