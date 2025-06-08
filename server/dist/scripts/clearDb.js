"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Category_1 = __importDefault(require("../models/Category"));
const MenuItem_1 = __importDefault(require("../models/MenuItem"));
dotenv_1.default.config();
const clearDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        const conn = yield mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        // Clear collections
        yield Category_1.default.deleteMany({});
        yield MenuItem_1.default.deleteMany({});
        console.log('Database collections cleared successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('Error clearing database:', error);
        process.exit(1);
    }
});
// Run the clear function
clearDatabase();
