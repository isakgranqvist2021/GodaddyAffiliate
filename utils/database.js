import mongoose from 'mongoose';
import env from './env';

async function connect() {
    try {
        await mongoose.connect(env.DB_URI, {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB has connected');
    } catch (err) {
        console.log(err);
    }
}

async function disconnect() {
    try {
        await mongoose.disconnect();

        console.log('MongoDB has disconnected');
    } catch (err) {
        console.log(err);
    }
}

export default { connect, disconnect };