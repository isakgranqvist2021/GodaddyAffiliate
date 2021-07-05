import mongoose from 'mongoose';
import fs from 'fs';

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
    console.log(data);

    if (data.removedImages.length > 0) {
        data.removedImages.forEach(img => {
            try {
                fs.unlinkSync(`./uploads/${img}`);
            } catch (err) {
                return;
            }
        });
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
        return Promise.reject(err);
    }
}


export default { createTemplate, findTemplates };