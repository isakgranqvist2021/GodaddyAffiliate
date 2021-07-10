import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    message: { type: String, required: true, min: 1 },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    nickname: { type: String, default: 'customer' },
    sentBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

const MessageModel = mongoose.model('Message', messageSchema);

async function createMessage(data) {
    try {
        return await new MessageModel(data).save();
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function findMessages(filter) {
    try {
        return await MessageModel.find(filter);
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export default { createMessage, findMessages };