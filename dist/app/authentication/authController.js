"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
const HandleResponse_1 = require("@utils/HandleResponse");
const Messages_1 = require("@utils/Messages");
const authService_1 = require("./authService");
const registerController = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email) {
        return (0, HandleResponse_1.HandleResponse)(res, 404, Messages_1.MESSAGES.ERROR.NOT_FOUND.USER.EMAIL);
    }
    if (!password) {
        return (0, HandleResponse_1.HandleResponse)(res, 404, Messages_1.MESSAGES.ERROR.NOT_FOUND.USER.PASSWORD);
    }
    if (!name) {
        return (0, HandleResponse_1.HandleResponse)(res, 404, Messages_1.MESSAGES.ERROR.NOT_FOUND.USER.NAME);
    }
    const register = await (0, authService_1.registerService)({ name, email, password });
    if (register === null || register === void 0 ? void 0 : register.message) {
        return (0, HandleResponse_1.HandleResponse)(res, register.statusCode, register.message);
    }
    (0, HandleResponse_1.HandleResponse)(res, 201, Messages_1.MESSAGES.CREATED.USER.ACCOUNT);
};
exports.registerController = registerController;
const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
        return (0, HandleResponse_1.HandleResponse)(res, 404, Messages_1.MESSAGES.ERROR.NOT_FOUND.USER.EMAIL);
    }
    if (!password) {
        return (0, HandleResponse_1.HandleResponse)(res, 404, Messages_1.MESSAGES.ERROR.NOT_FOUND.USER.PASSWORD);
    }
    const login = await (0, authService_1.loginService)({ email, password });
    if (login === null || login === void 0 ? void 0 : login.message) {
        return (0, HandleResponse_1.HandleResponse)(res, login.statusCode, login.message);
    }
    (0, HandleResponse_1.HandleResponse)(res, 200, Messages_1.MESSAGES.SUCCESS.USER, { access_token: login });
};
exports.loginController = loginController;
