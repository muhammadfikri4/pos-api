"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const AppError = (message, statusCode) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};
exports.AppError = AppError;
