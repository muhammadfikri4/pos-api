"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRoute_1 = __importDefault(require("@app/authentication/authRoute"));
const express_1 = require("express");
const route = (0, express_1.Router)();
route.use("/auth", authRoute_1.default);
route.get("/", (req, res) => {
    return res.json({ message: "Hello World 🚀" });
});
exports.default = route;
