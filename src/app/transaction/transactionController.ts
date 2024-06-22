import { StatusTransaction } from "@prisma/client";
import { ProductBodyDTO } from "app/product/productDTO";
import { deleteProductService, updateProductService } from "app/product/productService";
import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createMidtransTransaction } from "./midtransService";
import { TransactionBodyDTO, TransactionDetailDTO, WebhookMidtransTransactionBodyDTO } from "./transactionDTO";
import { UpdateToPaidTransactionService, createTransactionService, customUpdateStatusTransactionService, getHistoryByTransactionIdService, getTransactionByIdService, getTransactionDetailByTransactionIdService, getTransactionService, handleWebhookTransactionService } from "./transactionService";
import { IFilterTransaction } from "./transactionTypes";

export const createTransactionController = async (req: Request, res: Response) => {
    const { name, email, paymentMethod, details } = req.body as TransactionBodyDTO;

    const transactionCreation = await createTransactionService({ details, email, name, paymentMethod });

    if ((transactionCreation as HttpError)?.message) {
        return HandleResponse(res, (transactionCreation as HttpError).statusCode, (transactionCreation as HttpError).code, (transactionCreation as HttpError).message);
    }

    if (paymentMethod === 'CASH') {
        return HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.TRANSACTION, transactionCreation);
    } else if (paymentMethod === 'QRIS') {
        const midtransResponse = await createMidtransTransaction(transactionCreation as TransactionBodyDTO, details as TransactionDetailDTO[], name as string, email as string);
        if ((midtransResponse as HttpError)?.message) {
            return HandleResponse(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, (midtransResponse as HttpError).message);
        }
        return HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.TRANSACTION, midtransResponse);
    } else {
        return HandleResponse(res, 400, MESSAGE_CODE.BAD_REQUEST, 'Invalid payment method');
    }
};

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

        return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.TRANSACTION.GET, transactionService.data, transactionService.meta)
    } catch (error) {
        return HandleResponse(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER)
    }

}

export const UpdateToPaidTransactionController = async (req: Request, res: Response) => {

    const { transactionId } = req.params
    const update = await UpdateToPaidTransactionService({ id: transactionId as string });
    if ((update as HttpError)?.message) {
        return HandleResponse(res, (update as HttpError).statusCode, (update as HttpError).code, (update as HttpError).message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.TRANSACTION.PAID);
}

export const getTransactionByIdController = async (req: Request, res: Response) => {
    const { id } = req.params
    const getById = await getTransactionByIdService(id)
    if ((getById as HttpError)?.message) {
        return HandleResponse(res, (getById as HttpError).statusCode, (getById as HttpError).code, (getById as HttpError).message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.TRANSACTION.GET, getById)
}

export const getHistoryByTransactionIdController = async (req: Request, res: Response) => {
    const { transactionId } = req.params
    const getHistory = await getHistoryByTransactionIdService(transactionId)
    if ((getHistory as HttpError)?.message) {
        return HandleResponse(res, (getHistory as HttpError).statusCode, (getHistory as HttpError).code, (getHistory as HttpError).message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.HISTORY.GET, getHistory)
}

export const customUpdateStatusTransactionController = async (req: Request, res: Response) => {
    const { transactionId } = req.params
    const { status } = req.body
    const updateStatus = await customUpdateStatusTransactionService(transactionId, status as StatusTransaction)
    if ((updateStatus as HttpError)?.message) {
        return HandleResponse(res, (updateStatus as HttpError).statusCode, (updateStatus as HttpError).code, (updateStatus as HttpError).message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.TRANSACTION.UPDATE_STATUS)
}

export const handleWebhookTransactionController = async (req: Request, res: Response) => {
    const { order_id, settlement_time, signature_key, transaction_status } = req.body as WebhookMidtransTransactionBodyDTO
    console.log(req.body)
    const paymentWebhook = await handleWebhookTransactionService(
        settlement_time as string,
        signature_key as string,
        order_id as string,
        transaction_status as string)


    console.log({ paymentWebhook })
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PAYMENT)
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
    const update = await deleteProductService(String(id));
    if ((update as HttpError)?.message) {
        return HandleResponse(res, (update as HttpError).statusCode, (update as HttpError).code, (update as HttpError).message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.DELETE)
}