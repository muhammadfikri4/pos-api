import dotenv from 'dotenv'
import { type Request } from 'express'
import { unlinkSync } from 'fs'
import { AppError, HttpError } from '../../utils/HttpError'
import { Meta } from '../../utils/Meta'
import { ProductBodyDTO } from './productDTO'
import { getProductMapper } from './productMapper'
import { createProduct, deleteProduct, getProductById, getProducts, getProductsCount, updateProduct } from './productRepo'
import { IFilterProduct, ProductModelTypes } from './productTypes'
import { createProductValidate, deleteProductValidate, updateProductValidate } from './productValidate'

dotenv.config()

export const createProductService = async ({ name, categoryId, price, stock }: ProductBodyDTO, req: Request) => {
    const image = req.file?.path

    const validate = await createProductValidate({ name, categoryId, image, stock }, req.file?.size as number)
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }
    const url = `${req.protocol}://${req.get('host')}/${image?.replace("src/", "")}`

    const created = await createProduct({ name, categoryId, price: Number(price), image: url, stock: Number(stock) })
    return created

}

export const getProductService = async ({ name, page = 1, perPage = 10 }: IFilterProduct) => {
    const allProducts = await getProducts({ name, page, perPage }) as unknown as ProductModelTypes[]
    const [products, totalData] = await Promise.all([
        getProductMapper(allProducts),
        getProductsCount({ name })])

    return { data: products, meta: Meta(page, perPage, totalData) }
}

export const updateProductService = async ({ id, name, categoryId, price, stock }: ProductBodyDTO, req: Request) => {
    const validate = await updateProductValidate({ id, name, categoryId, price, image: req.file?.path }, req.file?.size as number)
    if ((validate as HttpError)?.message) {
        return AppError((validate as HttpError).message, (validate as HttpError).statusCode, (validate as HttpError).code)
    }
    const image = req.file?.path
    const url = `${req.protocol}://${req.get('host')}/${image?.replace("src/", "")}`

    const updateFields: ProductBodyDTO = { id };
    const oldProduct = await getProductById(id)
    if (name !== undefined) updateFields.name = name;
    if (categoryId !== undefined) updateFields.categoryId = categoryId;
    if (price !== undefined) updateFields.price = Number(price);
    if (image !== undefined) updateFields.image = url;
    if (stock !== undefined) updateFields.stock = stock;
    if (categoryId === undefined) updateFields.categoryId = oldProduct?.categoryId

    if (image) {
        unlinkSync(oldProduct?.image.replace("http://localhost:5000/", "src/") as string);
    }

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