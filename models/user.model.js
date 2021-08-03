import { getUserInfo } from '../utils/helpers';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    lastLogin: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    userInfo: { type: Object, required: true },
    email: { type: String, required: false, unique: true, default: null },
    phone: { type: String, required: false, default: null },
    admin: { type: Boolean, default: false },
    logoCredits: [String]
});

const UserModel = mongoose.model('User', userSchema);

async function register(data) {
    try {
        let userInfo = await getUserInfo();
        return await new UserModel({
            ...data,
            userInfo: userInfo
        }).save();
    } catch (err) {
        console.log(err);
        return Promise.reject(err.code === 11000 ? 'seems like you already have an account' : 'caught error');
    }
}

async function login(data, filter) {
    try {
        let user = await UserModel.findOne(filter);

        if (user !== null) {
            user.lastLogin = new Date();
            await user.save();
            return Promise.resolve(user);
        }

        return Promise.resolve(await register(data))
    } catch (err) {
        return Promise.reject(typeof (err) === 'string' ? err : 'caught error');
    }
}

async function findUser(filter) {
    try {
        return await UserModel.findOne(filter);
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function updateUser(filter, update) {
    try {
        return await UserModel.findOneAndUpdate(filter, update);
    } catch (err) {
        console.log(err);
        return Promise.reject('caught error');
    }
}

export default { register, login, findUser, updateUser };