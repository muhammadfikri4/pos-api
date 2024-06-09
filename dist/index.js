"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@libs/config");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const config_2 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = config_1.ENV.PORT || 5000;
dotenv_1.default.config();
app.use(express_1.default.json());
(0, config_2.dbconect)();
app.use(routes_1.default);
app.listen(port, () => {
    console.log("Run at port 3000🚀");
});
exports.default = app;
