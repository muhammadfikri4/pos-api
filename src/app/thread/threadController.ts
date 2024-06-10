import { MESSAGE_CODE } from '@utils/ErrorCode';
import { type Request, type Response } from 'express';
import { decode } from 'jsonwebtoken';
import { UserModelTypes } from '../../app/authentication/authTypes';
import { ThreadModel } from '../../config/model/thread';
import { UserModel } from '../../config/model/user';
import { HandleResponse } from '../../utils/HandleResponse';
import { MESSAGES } from '../../utils/Messages';
import { getThreadService } from './threadService';

export const createThreadController = async (req: Request, res: Response) => {
    const { thread } = req.body;
    const { access_token } = req.cookies;
    if (!access_token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const data = decode(access_token) as UserModelTypes
    await ThreadModel.create({ thread, userId: data?.id })
    const findUser = await UserModel.findOne({ _id: data?.id })
    res.json({
        message: "Create Thread", data: {
            thread,
            user: findUser

        }
    })
}

export const getThreadController = async (req: Request, res: Response) => {
    const { access_token } = req.cookies;
    if (!access_token) {
        return HandleResponse(res, 401, MESSAGES.ERROR.UNAUTHORIZED.AUTH, MESSAGE_CODE.UNAUTHORIZED)
    }
    const threads = await getThreadService()
    res.json({ message: "Get Thread", data: threads })

}   