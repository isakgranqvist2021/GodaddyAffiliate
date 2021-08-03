import { getUserInfo } from '../utils/helpers';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    lastLogin: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    userInfo: { type: Object, required: true },
    email: { type: String, required: false, unique: true, default: null },
    phone: { type: String, required: false, unique: true, default: null },
    admin: { type: Boolean, default: false },
    logoCredits: [String]
});

const UserModel = mongoose.model('User', userSchema);

async function register(data) {
    let userInfo = await getUserInfo();
    return await new UserModel({
        ...data,
        userInfo: userInfo
    }).save();
}

async function login(data, filter) {
    let user = await UserModel.findOne(filter);

    if (user !== null) {
        user.lastLogin = new Date();
        await user.save();
        return Promise.resolve(user);
    }

    return Promise.resolve(await register(data))
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