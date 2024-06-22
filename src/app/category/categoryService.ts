import dotenv from 'dotenv'
import { MESSAGE_CODE } from '../../utils/ErrorCode'
import { AppError, HttpError } from '../../utils/HttpError'
import { MESSAGES } from '../../utils/Messages'
import { Meta } from '../../utils/Meta'
import { CategoryBodyDTO } from './categoryDTO'
import { createCategory, deleteCategory, getCategories, getCategoriesCount, getCategoryById, getCategoryByName, updateCategory } from './categoryRepo'
import { IFilterCategory } from './categoryTypes'
import { deleteCategoryValidate, updateCategoryValidate } from './categoryValidate'

dotenv.config()

export const createCategoryService = async ({ name }: CategoryBodyDTO) => {
    if (!name) {
        return AppError(MESSAGES.ERROR.REQUIRED.NAME, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const findName = await getCategoryByName({ name })
    if (findName) {
        return AppError(MESSAGES.ERROR.ALREADY.CATEGORY, 400, MESSAGE_CODE.BAD_REQUEST)
    }

    const newCategory = await createCategory({ name })
    return newCategory

}

export const getCategoryService = async ({ name, page = 1, perPage = 10 }: IFilterCategory) => {

    const [categories, totalData] = await Promise.all([
        getCategories({ name, page, perPage }),
        getCategoriesCount({ name })])

    return { data: categories, meta: Meta(page, perPage, totalData) }
}

export const updateCategoryService = async ({ id, name }: CategoryBodyDTO) => {
    const validate = await updateCategoryValidate({ id, name })
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }

    const newCategory = await updateCategory({ id, name })
    return newCategory
}

export const deleteCategoryService = async (id: string) => {
    const validate = await deleteCategoryValidate(id)
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }

    const newCategory = await deleteCategory(id)
    return newCategory
}

export const getCategoryByIdService = async (category_id: string) => {
    const category = await getCategoryById(category_id);
    if (!category) {
      return AppError(MESSAGES.ERROR.NOT_FOUND.CATEGORY, 404, MESSAGE_CODE.NOT_FOUND);
    }  
    const { id, name } = category;
    return { id, name };
  };