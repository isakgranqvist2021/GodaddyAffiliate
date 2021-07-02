import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    tags: { type: [String], required: true },
    service: { type: String, required: true },
    price: { type: Number, required: true },
    orders: { type: Number, default: 0 },
    images: { type: [String], required: true },
});

