import dotenv from 'dotenv'
import { AppError, HttpError } from '../../utils/HttpError'
import { Meta } from '../../utils/Meta'
import { ProductBodyDTO } from './productDTO'
import { getProductMapper } from './productMapper'
import { createProduct, deleteProduct, getProductById, getProducts, getProductsCount, updateProduct } from './productRepo'
import { IFilterProduct } from './productTypes'
import { createProductValidate, deleteProductValidate, updateProductValidate } from './productValidate'

dotenv.config()

export const createProductService = async ({ name, categoryId, price }: ProductBodyDTO) => {
    const validate = await createProductValidate({ name, categoryId })
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }

    const created = await createProduct({ name, categoryId, price })
    return created

}

export const getProductService = async ({ name, page = 1, perPage = 10 }: IFilterProduct) => {
    const allProducts = await getProducts({ name, page, perPage })
    const [products, totalData] = await Promise.all([
        getProductMapper(allProducts),
        getProductsCount({ name })])

    return { data: products, meta: Meta(page, perPage, totalData) }
}

export const updateProductService = async ({ id, name, categoryId, price }: ProductBodyDTO) => {
    const validate = await updateProductValidate({ id, name, categoryId, price })
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }
    const updateFields: ProductBodyDTO = { id };
    const oldProduct = await getProductById(id)
    if (name !== undefined) updateFields.name = name;
    if (categoryId !== undefined) updateFields.categoryId = categoryId;
    if (price !== undefined) updateFields.price = price;
    if (categoryId === undefined) updateFields.categoryId = oldProduct?.categoryId

    const updated = await updateProduct(updateFields)
    return updated
}

export const deleteProductService = async (id: string) => {
    const validate = await deleteProductValidate(id)
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }

    const deleted = await deleteProduct(id)
    return deleted
}