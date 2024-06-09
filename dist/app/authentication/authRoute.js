"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("./authController");
const route = (0, express_1.Router)();
route.post("/register", authController_1.registerController);
route.get("/login", authController_1.loginController);
exports.default = route;
