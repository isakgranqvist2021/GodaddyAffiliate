import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    lastLogin: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    country: { type: Object, required: false },
    phone: { type: String, required: false, unique: true },
    admin: { type: Boolean, default: false },
});

const UserModel = mongoose.model('User', userSchema);

async function register(data) {
    try {
        return await new UserModel({ phone: data.phone, country: data.country }).save();
    } catch (err) {
        return Promise.reject(err.code === 11000 ? 'seems like you already have an account' : 'caught error');
    }
}

async function login(data) {
    try {
        let user = await UserModel.findOne({ phone: data.phone });

        if (user !== null) {
            user.lastLogin = new Date();
            await user.save();
            return Promise.resolve(user);
        }

        return Promise.resolve(await register(data))
    } catch (err) {
    }
}

async function findUser(filter) {
    try {
        return await UserModel.findOne(filter);
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export default { register, login, findUser };