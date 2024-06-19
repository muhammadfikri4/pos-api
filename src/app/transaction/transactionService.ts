import dotenv from 'dotenv'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { getProductById, updateProductStock } from '../product/productRepo'
import { TransactionBodyDTO, TransactionDetailDTO } from './transactionDTO'
import { getTransactionsMapper } from './transactionMapper'
import { createTransaction, createTransactionDetail, getTransaction, getTransactionById, getTransactionCount, getTransactionDetailByTransactionId, updateStatusTransaction } from './transactionRepo'
import { IFilterTransaction, TransactionModelTypes } from './transactionTypes'
import { createTransactionDetailValidate, createTransactionValidate, updateStatusToPaidTransactionValidate } from './transactionValidate'

dotenv.config()

export const createTransactionService = async ({ details, email, name, paymentMethod }: TransactionBodyDTO) => {

    const validateTransaction = await createTransactionValidate({ email, details, name, paymentMethod })
    if ((validateTransaction as HttpError)?.message) {
        return AppError((validateTransaction as HttpError).message, (validateTransaction as HttpError).statusCode, (validateTransaction as HttpError).code)
    }

    const transactionCreation = await createTransaction({ email, name, paymentMethod, details })
    const detailTransaction = details?.map(detail => ({ ...detail, transactionId: transactionCreation.id }))

    const validateTransactionDetail = await createTransactionDetailValidate(detailTransaction as TransactionDetailDTO[])

    if ((validateTransactionDetail as HttpError)?.message) {
        return AppError((validateTransactionDetail as HttpError).message, (validateTransactionDetail as HttpError).statusCode, (validateTransactionDetail as HttpError).code)
    }

    await createTransactionDetail({ details: detailTransaction })
    return transactionCreation
}

export const getTransactionDetailByTransactionIdService = async (transactionId: string) => {
    const transactionDetail = await getTransactionDetailByTransactionId(transactionId)
    return transactionDetail

}

export const getTransactionService = async ({ email, name, page = 1, perPage = 10 }: IFilterTransaction) => {
    const transactionData = await getTransaction({ email, name, page, perPage });
    const [transactions, totalTransaction] = await Promise.all([
        getTransactionsMapper(transactionData as unknown as TransactionModelTypes[]),
        getTransactionCount({ email, name })])
    return { data: transactions, meta: Meta(page, perPage, totalTransaction) }
}

export const UpdateToPaidTransactionService = async ({ id }: TransactionBodyDTO) => {

    const validate = await updateStatusToPaidTransactionValidate(id as string)

    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }

    const findTransaction = await getTransactionById(id as string)
    const promises = findTransaction?.transactionDetails?.map(async (item) => {
        const getProduct = await getProductById(item?.productId)
        await updateProductStock(getProduct?.id as string, (getProduct?.stock as number) - (item?.quantity as number))
        return []
    }) || []
    await Promise.all(promises)
    const updateTransaction = await updateStatusTransaction(id as string, 'PAID');
    return updateTransaction
}

export const getTransactionByIdService = async (id: string) => {
    const transaction = await getTransactionById(id)
    if (!transaction) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.TRANSACTION, 404, MESSAGE_CODE.NOT_FOUND)
    }
    return transaction
}

// export const getProductService = async ({ name, page = 1, perPage = 10, categoryId }: IFilterProduct) => {
//     const allProducts = await getProducts({ name, page, perPage, categoryId }) as unknown as ProductModelTypes[]
//     const [products, totalData] = await Promise.all([
//         getProductMapper(allProducts),
//         getProductsCount({ name })])

//     return { data: products, meta: Meta(page, perPage, totalData) }
// }

// export const updateProductService = async ({ id, name, categoryId, price, stock }: ProductBodyDTO, req: Request) => {
//     const validate = await updateProductValidate({ id, name, categoryId, price, image: req.file?.path }, req.file?.size as number)
//     if ((validate as HttpError)?.message) {
//         return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
//     }
//     const image = req.file?.filename
//     // const url = `${req.protocol}://${req.get('host')}/${image?.replace("src/", "")}`
//     const url = `${req.protocol}://${req.get('host')}/${PATH_IMAGES.products}/${image}`

//     const updateFields: ProductBodyDTO = { id };
//     const oldProduct = await getProductById(id)
//     if (name !== undefined) updateFields.name = name;
//     if (categoryId !== undefined) updateFields.categoryId = categoryId;
//     if (price !== undefined) updateFields.price = Number(price);
//     if (image !== undefined) updateFields.image = url;
//     if (stock !== undefined) updateFields.stock = stock;
//     if (categoryId === undefined) updateFields.categoryId = oldProduct?.categoryId

//     if (image) {
//         // unlinkSync(oldProduct?.image.replace("http://localhost:5000/", "src/") as string);
//         unlinkSync(oldProduct?.image.replace("http://localhost:5000/", "src/") as string);
//     }

//     const updated = await updateProduct(updateFields)
//     return updated
// }

// export const deleteProductService = async (id: string) => {
//     const validate = await deleteProductValidate(id)
//     if ((validate as HttpError)?.message) {
//         return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
//     }

//     const deleted = await deleteProduct(id)
//     return deleted
// }