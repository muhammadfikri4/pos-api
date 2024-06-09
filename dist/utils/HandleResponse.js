"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleResponse = void 0;
const ApiResponse_1 = require("./ApiResponse");
function HandleResponse(res, status, message, data) {
    return res.status(status).json((0, ApiResponse_1.ApiResponse)({ status, message, data }));
}
exports.HandleResponse = HandleResponse;
