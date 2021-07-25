import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    originalname: { type: String, default: null },
    filename: { type: String, required: true }, // where the file is stored on disk
    type: { type: String, required: true }, // what type of file is it?
    order: { type: Schema.Types.ObjectId, ref: 'Order' }, // the id of the order this file is associated with
    belongsTo: { type: Schema.Types.ObjectId, ref: 'User ' }
});

const FileModel = mongoose.model('File', fileSchema);

async function insertMany(data) {
    try {
        console.log('Insert', data);

        return await FileModel.insertMany(data);
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function insertOne(data) {
    try {
        return await new FileModel(data).save();
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function findMany(filter) {
    try {
        return await FileModel.find(filter);
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function removeOne(id) {
    try {
        return await FileModel.findOneAndRemove({ _id: id });
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export default { insertMany, insertOne, findMany, removeOne };