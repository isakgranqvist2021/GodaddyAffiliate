import mongoose from 'mongoose';
import cloud from '../utils/cloud';

const Schema = mongoose.Schema;

const templateSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    service: { type: String, required: true },
    tags: { type: [String], required: true },
    orders: { type: Number, default: 0 },
    images: { type: [String], required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    active: { type: Boolean, required: true }
});

const TemplateModel = mongoose.model('Template', templateSchema);

async function createTemplate(data) {
    if (data.removedImages.length > 0) {
        await Promise.all(data.removedImages.map(async (img) => {
            return await cloud.remove(img);
        }));
    }

    try {
        return await new TemplateModel(data).save();
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function findTemplates(filter) {
    try {
        return await TemplateModel.find(filter);
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function findTemplate(filter) {
    try {
        return await TemplateModel.findOne(filter);
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function updateTemplate(filter, update) {
    try {
        return await TemplateModel.findOneAndUpdate(filter, update);
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export default { createTemplate, findTemplates, findTemplate, updateTemplate };