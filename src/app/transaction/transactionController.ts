import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { MESSAGES } from "../../utils/Messages";
import { TransactionModel } from "./transactionDTO";
import { createTransactionService } from "./transactionService";

export const createTransactionController = async (req: Request, res: Response) => {

    const { data } = req.body as TransactionModel
    // const create = await createCustomer({ name, email, numberPhone });
    // res.json({ data: create })
    const transactionCreation = await createTransactionService({ productId, quantity, customerEmail, customerName });

    // if ((transactionCreation as HttpError)?.message) {
    //     return HandleResponse(res, (transactionCreation as HttpError).statusCode, (transactionCreation as HttpError).code, (transactionCreation as HttpError).message)
    // }
    return HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.TRANSACTION)
}

// export const getProductController = async (req: Request, res: Response) => {
//     try {
//         const { name, page, perPage, categoryId } = req.query as unknown as IFilterProduct

//         const products = await getProductService({ name, page: Number(page) || undefined, perPage: Number(perPage) || undefined, categoryId: categoryId || undefined });

//         return HandleResponse<ProductModelTypes[]>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.GET, products?.data as unknown as ProductModelTypes[], products?.meta)
//     } catch (error) {
//         return HandleResponse(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER)
//     }

// }

// export const updateProductController = async (req: Request, res: Response) => {
//     const { id } = req.params
//     const { name, categoryId, price, stock } = req.body as ProductBodyDTO
//     const update = await updateProductService({ name, categoryId, price, id, stock }, req);
//     if ((update as HttpError)?.message) {
//         return HandleResponse(res, (update as HttpError).statusCode, (update as HttpError).code, (update as HttpError).message)
//     }
//     return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.UPDATE)
// }
// export const deleteProductController = async (req: Request, res: Response) => {
//     const { id } = req.params
//     const update = await deleteProductService(String(id));
//     if ((update as HttpError)?.message) {
//         return HandleResponse(res, (update as HttpError).statusCode, (update as HttpError).code, (update as HttpError).message)
//     }
//     return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.DELETE)
// }