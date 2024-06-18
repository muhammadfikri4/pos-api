import prisma from "../../config";
import { CustomerBodyDTO, TransactionBodyDTO } from "./transactionDTO";

export const createTransaction = async ({ productId, quantity, customerId, totalAmount }: TransactionBodyDTO) => {

    return await prisma.transaction.createMany({
        data: {
            productId: productId as string,
            quantity: quantity as number,
            total_amount: totalAmount as number,
            status: 'PAID',
            customerId: customerId as string
        }
    })
}

export const createCustomer = async ({ email, name, numberPhone }: CustomerBodyDTO) => {
    return await prisma.customer.create({
        data: {
            email: email as string,
            name: name as string,
            number_phone: numberPhone as number
        }
    })
}