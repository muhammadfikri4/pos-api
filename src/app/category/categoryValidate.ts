import { MESSAGE_CODE } from "../../utils/ErrorCode"
import { AppError } from "../../utils/HttpError"
import { MESSAGES } from "../../utils/Messages"
import { CategoryBodyDTO } from "./categoryDTO"
import { getCategoryById, getCategoryByName, getProductsByCategoryId } from "./categoryRepo"

export const updateCategoryValidate = async ({ name, id }: CategoryBodyDTO) => {
    const findUnique = await getCategoryById(id)
    if (!findUnique) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.CATEGORY, 404, MESSAGE_CODE.NOT_FOUND)
    }

    if (!name) {
        return AppError(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const findCategory = await getCategoryByName({ name })
    if (name && findCategory && findUnique && findCategory.id !== findUnique.id) {
        return AppError(MESSAGES.ERROR.ALREADY.CATEGORY, 400, MESSAGE_CODE.BAD_REQUEST)
    }
}

export const deleteCategoryValidate = async (id: string) => {
    const findUnique = await getCategoryById(id)
    if (!findUnique) {
        return AppError(MESSAGES.ERROR.NOT_FOUND.CATEGORY, 404, MESSAGE_CODE.NOT_FOUND);
    }
    const relatedProducts = await getProductsByCategoryId(id);
    if (relatedProducts.length > 0) {
        return AppError(MESSAGES.ERROR.RELATED.PRODUCT, 400, MESSAGE_CODE.BAD_REQUEST);
    }
}