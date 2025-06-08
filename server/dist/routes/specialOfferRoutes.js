"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const specialOfferController_1 = require("../controllers/specialOfferController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public routes
router.get('/', specialOfferController_1.getSpecialOffers);
// Protected routes
router.post('/', auth_1.authenticateToken, specialOfferController_1.createSpecialOffer);
router.put('/:id', auth_1.authenticateToken, specialOfferController_1.updateSpecialOffer);
router.delete('/:id', auth_1.authenticateToken, specialOfferController_1.deleteSpecialOffer);
router.patch('/:id/toggle', auth_1.authenticateToken, specialOfferController_1.toggleActive);
exports.default = router;
