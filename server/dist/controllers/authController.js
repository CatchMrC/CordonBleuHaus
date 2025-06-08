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
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a strong, random secret in production
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        // Check if user already exists
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = yield User_1.default.create({ username, password, role });
        // Do not return password hash in response
        const userResponse = {
            _id: user._id,
            username: user.username,
            role: user.role,
        };
        res.status(201).json({ message: 'User registered successfully', user: userResponse });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Check for user existence
        const user = yield User_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Compare password
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        // Do not return password hash in response
        const userResponse = {
            _id: user._id,
            username: user.username,
            role: user.role,
        };
        res.status(200).json({ token, user: userResponse });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});
exports.loginUser = loginUser;
