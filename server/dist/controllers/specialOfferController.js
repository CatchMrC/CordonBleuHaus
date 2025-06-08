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
exports.toggleActive = exports.deleteSpecialOffer = exports.updateSpecialOffer = exports.createSpecialOffer = exports.getSpecialOffers = void 0;
const SpecialOffer_1 = __importDefault(require("../models/SpecialOffer"));
// Get all special offers
const getSpecialOffers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offers = yield SpecialOffer_1.default.find().sort({ createdAt: -1 });
        res.json(offers);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch special offers' });
    }
});
exports.getSpecialOffers = getSpecialOffers;
// Create a new special offer
const createSpecialOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, image, validUntil, type } = req.body;
        const offer = new SpecialOffer_1.default({
            title,
            description,
            image,
            validUntil,
            type
        });
        yield offer.save();
        res.status(201).json(offer);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to create special offer' });
    }
});
exports.createSpecialOffer = createSpecialOffer;
// Update a special offer
const updateSpecialOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, image, validUntil, type, active } = req.body;
        const offer = yield SpecialOffer_1.default.findByIdAndUpdate(req.params.id, { title, description, image, validUntil, type, active }, { new: true });
        if (!offer) {
            return res.status(404).json({ error: 'Special offer not found' });
        }
        res.json(offer);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to update special offer' });
    }
});
exports.updateSpecialOffer = updateSpecialOffer;
// Delete a special offer
const deleteSpecialOffer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offer = yield SpecialOffer_1.default.findByIdAndDelete(req.params.id);
        if (!offer) {
            return res.status(404).json({ error: 'Special offer not found' });
        }
        res.json({ message: 'Special offer deleted successfully' });
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to delete special offer' });
    }
});
exports.deleteSpecialOffer = deleteSpecialOffer;
// Toggle active status
const toggleActive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const offer = yield SpecialOffer_1.default.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ error: 'Special offer not found' });
        }
        offer.active = !offer.active;
        yield offer.save();
        res.json(offer);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to toggle special offer status' });
    }
});
exports.toggleActive = toggleActive;
