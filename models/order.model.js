import mongoose from 'mongoose';
import templateModel from './template.model';
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
    status: { type: String, required: true },
    completed: { type: Boolean, default: false }
});

const OrderModel = mongoose.model('Order', orderSchema);

async function createOrder(data) {
    try {
        await templateModel.updateTemplate({ _id: data.inv.temp }, {
            $inc: { orders: 1 }
        });

        return await new OrderModel(data).save();
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function findOrders(filter) {
    try {
        return await OrderModel.find(filter).populate([
            { path: 'belongsTo', model: 'User' },
            {
                path: 'inv', populate: {
                    path: 'temp', model: 'Template'
                }
            }
        ]).exec();
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function findOrder(filter) {
    try {
        return await OrderModel.findOne(filter).populate([
            { path: 'belongsTo', model: 'User' },
            {
                path: 'inv', populate: {
                    path: 'temp', model: 'Template'
                }
            }
        ]).lean().exec();
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function addEvent(filter, event) {
    try {
        const order = await OrderModel.findOne(filter);
        order.events.push(event);
        return await order.save();
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function removeEvent(filter, index) {
    try {
        const order = await OrderModel.findOne(filter);
        order.events.splice(index, 1);
        return await order.save();
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function markOrder(filter, mark) {
    try {
        return await OrderModel.findOneAndUpdate(filter, { completed: mark });
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export default {
    createOrder,
    findOrders,
    findOrder,
    addEvent,
    removeEvent,
    markOrder
};
