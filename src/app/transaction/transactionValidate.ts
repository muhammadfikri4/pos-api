import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { AppError } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { getProductById } from "../product/productRepo"
import { TransactionBodyDTO } from "./transactionDTO"
// import { getProductById, getProductByName } from "./transactionRepo"

export const createTransactionValidate = async ({ productId, quantity, customerEmail, customerName }: TransactionBodyDTO) => {
    if (!productId) {
        return AppError(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const findProduct = await getProductById(productId)
    if (!findProduct) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.PRODUCT, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    if (!quantity) {
        return AppError(MESSAGES.ERROR.REQUIRED.QUANTITY, 400, MESSAGE_CODE.BAD_REQUEST)
    }




}
// export const updateProductValidate = async ({ name, id, image }: ProductBodyDTO, size: number) => {
//     const findUnique = await getProductById(id)
//     if (!findUnique) {
//         return AppError(MESSAGES.ERROR.NOT_FOUND.PRODUCT, 404, MESSAGE_CODE.NOT_FOUND)
//     }

//     const findProduct = await getProductByName({ name })

//     if (name && findProduct && findUnique && findProduct.id !== findUnique.id) {
//         return AppError(MESSAGES.ERROR.ALREADY.PRODUCT, 400, MESSAGE_CODE.BAD_REQUEST)
//     }

//     if (size > 5242880) {
//         unlinkSync(image as string)
//         return AppError(MESSAGES.ERROR.INVALID.IMAGE_SIZE, 400, MESSAGE_CODE.BAD_REQUEST)
//     }
// }

// export const deleteProductValidate = async (id: string) => {
//     const findUnique = await getProductById(id)
//     if (!findUnique) {
//         return AppError(MESSAGES.ERROR.NOT_FOUND.PRODUCT, 404, MESSAGE_CODE.NOT_FOUND)
//     }
// }