import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { AppError } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { getCategoryById } from "../category/categoryRepo"
import { ProductBodyDTO } from "./productDTO"
import { getProductById, getProductByName } from "./productRepo"

export const createProductValidate = async ({ name, categoryId }: ProductBodyDTO) => {
    if (!name) {
        return AppError(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const findName = await getProductByName({ name })
    if (findName) {
        return AppError(MESSAGES.ERROR.ALREADY.PRODUCT, 400, MESSAGE_CODE.BAD_REQUEST)
    }
    const findCategory = await getCategoryById(categoryId)
    if (!findCategory) {
        return AppError(MESSAGES.ERROR.INVALID.CATEGORY_ID, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}
export const updateProductValidate = async ({ name, id }: ProductBodyDTO) => {
    const findUnique = await getProductById(id)
    if (!findUnique) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.PRODUCT, 404, MESSAGE_CODE.NOT_FOUND)
    }

    if (!name) {
        return AppError(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const findProduct = await getProductByName({ name })
    if (findProduct && findUnique && findProduct.id !== findUnique.id) {
        return AppError(MESSAGES.ERROR.ALREADY.CATEGORY, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}

export const deleteProductValidate = async (id: string) => {
    const findUnique = await getProductById(id)
    if (!findUnique) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.PRODUCT, 404, MESSAGE_CODE.NOT_FOUND)
    }
}