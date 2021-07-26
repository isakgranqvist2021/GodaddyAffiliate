import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const meetingSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    businessName: { type: String, required: true },
    description: { type: String, required: true },
    socialLinks: [String],
    phone: { type: String, required: true },
    email: { type: String, required: true },
    dates: { type: Array, default: [] },
    approved: { type: Boolean, default: false },
    date: { type: Date, default: null },
    meetingDetails: { type: Object, default: null }
});

const MeetingModel = mongoose.model('Meeting', meetingSchema);


async function createRequest(data) {
    try {
        return await new MeetingModel(data).save();
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export default { createRequest };