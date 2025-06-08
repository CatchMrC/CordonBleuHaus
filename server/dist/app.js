"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const menuItemRoutes_1 = __importDefault(require("./routes/menuItemRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const specialOfferRoutes_1 = __importDefault(require("./routes/specialOfferRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/menu-items', menuItemRoutes_1.default);
app.use('/api/categories', categoryRoutes_1.default);
app.use('/api/special-offers', specialOfferRoutes_1.default);
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/cordonbleuhaus')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));
exports.default = app;
