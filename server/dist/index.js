"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const menuItemRoutes_1 = __importDefault(require("./routes/menuItemRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cordon-bleu-haus';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Cordon Bleu Haus API' });
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Serve static uploaded files
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Routes
app.use('/api/categories', categoryRoutes_1.default);
app.use('/api/menu-items', menuItemRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
