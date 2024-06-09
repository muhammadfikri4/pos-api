"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.registerService = void 0;
const config_1 = require("@libs/config");
const user_1 = require("@model/user");
const HttpError_1 = require("@utils/HttpError");
const Messages_1 = require("@utils/Messages");
const Regex_1 = require("@utils/Regex");
const bcrypt = __importStar(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const registerService = async ({ email, name, password }) => {
    if (!Regex_1.REGEX.email.test(email)) {
        return (0, HttpError_1.AppError)(Messages_1.MESSAGES.ERROR.INVALID.USER.EMAIL, 400);
    }
    const user = await user_1.UserModel.findOne({ email });
    if (user) {
        return (0, HttpError_1.AppError)(Messages_1.MESSAGES.ERROR.ALREADY.USER.ACCOUNT, 400);
    }
    if (password.length < 8) {
        return (0, HttpError_1.AppError)(Messages_1.MESSAGES.ERROR.INVALID.USER.PASSWORD_LENGTH, 400);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await user_1.UserModel.create({ name, email, password: hashPassword });
    return newUser;
};
exports.registerService = registerService;
const loginService = async ({ email, password }) => {
    const user = await user_1.UserModel.findOne({ email });
    if (!user) {
        return (0, HttpError_1.AppError)(Messages_1.MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT, 404);
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return (0, HttpError_1.AppError)(Messages_1.MESSAGES.ERROR.INVALID.USER.PASSWORD, 401);
    }
    const token = jsonwebtoken_1.default.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }, config_1.ENV.JWT_SECRET);
    return token;
};
exports.loginService = loginService;
