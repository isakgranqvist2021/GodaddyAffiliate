import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    events: { type: Array, required: true },
    belongsTo: { type: Schema.Types.ObjectId, ref: 'User' },
    inv: {
        tag: { type: String, required: true },
        temp: { type: Schema.Types.ObjectId, ref: 'Template' },
        dom: { type: Object, required: true }
    },
    cid: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    customer: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true }
});

const OrderModel = mongoose.model('Order', orderSchema);

async function createOrder(data) {
    try {
        return await new OrderModel(data).save();
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export default { createOrder };
