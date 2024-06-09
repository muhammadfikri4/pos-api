"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbconect = void 0;
const config_1 = require("@libs/config");
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const mongoURI = process.env.DB_URL;
mongoose_1.default.set('strictQuery', true);
const dbconect = async () => {
    try {
        await mongoose_1.default.connect(mongoURI, {
            dbName: config_1.ENV.DB_NAME,
            user: config_1.ENV.DB_USER,
            pass: config_1.ENV.DB_PASSWORD
        });
        console.log("DB connected🚀");
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.dbconect = dbconect;
// mongodb + srv://muhfikriantoaji:muhfikri04@cluster0.rupsheq.mongodb.net/
