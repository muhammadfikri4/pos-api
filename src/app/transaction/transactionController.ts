import { type Request, type Response } from "express";
import { HttpError } from "utils/HttpError";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { MESSAGES } from "../../utils/Messages";
import { TransactionBodyDTO } from "./transactionDTO";
import { createTransactionService, getTransactionDetailByTransactionIdService, getTransactionService } from "./transactionService";
import { IFilterTransaction } from "./transactionTypes";

export const createTransactionController = async (req: Request, res: Response) => {

    const { name, email, paymentMethod, details } = req.body as TransactionBodyDTO

    const transactionCreation = await createTransactionService({ details, email, name, paymentMethod });

    if ((transactionCreation as HttpError)?.message) {
        return HandleResponse(res, (transactionCreation as HttpError).statusCode, (transactionCreation as HttpError).code, (transactionCreation as HttpError).message)
    }
    return HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.TRANSACTION)
}

export const getTransactionDetailsByTransactionIdController = async (req: Request, res: Response) => {
    try {
        const { transactionId } = req.params

        const products = await getTransactionDetailByTransactionIdService(transactionId);

        return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.GET, products)
    } catch (error) {
        return HandleResponse(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER)
    }

}
export const getTransactionController = async (req: Request, res: Response) => {

    try {
        const { page, perPage, email, name } = req.query as IFilterTransaction

        const transactionService = await getTransactionService({ email, name, page, perPage })

        return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.GET, transactionService)
    } catch (error) {
        return HandleResponse(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER)
    }

}

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