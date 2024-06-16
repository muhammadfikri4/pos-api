import { type Request, type Response } from "express";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { HandleResponse } from "../../utils/HandleResponse";
import { HttpError } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { createCategoryService, deleteCategoryService, getCategoryService, updateCategoryService } from "./categoryService";
import { CategoryModelTypes, IFilterCategory } from "./categoryTypes";

export const createCategoryController = async (req: Request, res: Response) => {

    const { name } = req.body

    const categoryCreation = await createCategoryService({ name });

    if ((categoryCreation as HttpError)?.message) {
        return HandleResponse(res, (categoryCreation as HttpError).statusCode, (categoryCreation as HttpError).code, (categoryCreation as HttpError).message)
    }
    return HandleResponse(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.CATEGORY)
}

export const getCategoryController = async (req: Request, res: Response) => {
    try {
        const { name, page, perPage } = req.query as unknown as IFilterCategory

        const categories = await getCategoryService({ name, page: Number(page) || undefined, perPage: Number(perPage) || undefined });

        return HandleResponse<CategoryModelTypes[]>(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.CATEGORY.GET, categories?.data as unknown as CategoryModelTypes[], categories?.meta)
    } catch (error) {
        return HandleResponse(res, 500, MESSAGE_CODE.INTERNAL_SERVER_ERROR, MESSAGES.ERROR.INTERNAL_SERVER)
    }

}

export const updateCategoryController = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    const update = await updateCategoryService({ name, id });
    if ((update as HttpError)?.message) {
        return HandleResponse(res, (update as HttpError).statusCode, (update as HttpError).code, (update as HttpError).message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.CATEGORY.UPDATE)
}
export const deleteCategoryController = async (req: Request, res: Response) => {
    const { id } = req.params
    const update = await deleteCategoryService(String(id));
    if ((update as HttpError)?.message) {
        return HandleResponse(res, (update as HttpError).statusCode, (update as HttpError).code, (update as HttpError).message)
    }
    return HandleResponse(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.CATEGORY.DELETE)
}