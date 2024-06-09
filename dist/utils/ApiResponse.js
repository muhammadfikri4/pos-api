"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
function ApiResponse({ data, status, message }) {
    return {
        status,
        message,
        data
    };
}
exports.ApiResponse = ApiResponse;
