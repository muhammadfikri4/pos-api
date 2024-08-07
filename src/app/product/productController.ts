import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { ProductBodyDTO } from "./productDTO";
import { createProductService, deleteProductService, getProductByIdService, getProductService, updateProductService } from "./productService";
import { IFilterProduct, ProductModelTypes } from "./productTypes";

export const createProductController = async (req: Request, res: Response) => {


    const { name, price, categoryId, stock } = req.body as ProductBodyDTO

    const prodyctCreation = await createProductService({ name, price, categoryId, stock }, req);

    if ((prodyctCreation as HttpError)?.message) {
        return HandleResponse(res, (prodyctCreation as HttpError).statusCode, (prodyctCreation as HttpError).code, (prodyctCreation as HttpError).message)
    }
    return HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.PRODUCT)
}

export const getProductController = async (req: Request, res: Response) => {
    try {
        const { name, page, perPage, categoryId } = req.query as unknown as IFilterProduct;

        const products = await getProductService({ name, page: Number(page) || undefined, perPage: Number(perPage) || undefined, categoryId: categoryId || undefined });

        return HandleResponse<ProductModelTypes[]>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.GET, products?.data as unknown as ProductModelTypes[], products?.meta)
    } catch (error) {
        return HandleResponse(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER)
    }

}

export const updateProductController = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, categoryId, price, stock } = req.body as ProductBodyDTO
    const update = await updateProductService({ name, categoryId, price, id, stock }, req);
    if ((update as HttpError)?.message) {
        return HandleResponse(res, (update as HttpError).statusCode, (update as HttpError).code, (update as HttpError).message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.UPDATE)
}
export const deleteProductController = async (req: Request, res: Response) => {
    const { id } = req.params
    const deleteProduct = await deleteProductService(String(id));
    if ((deleteProduct as HttpError)?.message) {
        return HandleResponse(res, (deleteProduct as HttpError).statusCode, (deleteProduct as HttpError).code, (deleteProduct as HttpError).message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.DELETE)
}

export const getProductByIdController = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await getProductByIdService(id);
    if ((product as HttpError)?.message) {
        return HandleResponse(res, (product as HttpError).statusCode, (product as HttpError).code, (product as HttpError).message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.GET, product)
}