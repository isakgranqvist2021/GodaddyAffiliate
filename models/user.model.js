import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: null },
    email: { type: String, required: false, unique: true },
    phone: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    authType: { type: String, default: 'email' }
});

const UserModel = mongoose.model('User', userSchema);

async function register(data) {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(data.password, salt);

        return await new UserModel({
            email: data.email || null,
            phone: data.phone || null,
            authType: data.authType,
            password: hash
        }).save();
    } catch (err) {
        console.log(err);
        return Promise.reject(err.code === 11000 ? 'seems like you already have an account' : 'caught error');
    }
}

async function login(data) {
    try {
        let user = await UserModel.findOne({ email: data.email });
        let OK = bcrypt.compareSync(data.password, user.password);

        if (OK) {
            return Promise.resolve(user);
        }

        return Promise.reject('wrong password');
    } catch (err) {
        return Promise.reject('caught error');
    }
}

async function findUser(filter) {
    try {
        return await UserModel.findOne(filter).select({ password: 0 }).exec();
    } catch (err) {
        return Promise.reject('caught error');
    }
}

export default { register, login, findUser };