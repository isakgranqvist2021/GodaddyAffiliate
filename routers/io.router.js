import messageModel from '../models/message.model';
import userModel from '../models/user.model';

function connection(socket, io) {
    socket.on('join', (id) => {
        socket.join(id);
    });

    socket.on('message', async (data) => {
        const user = await userModel.findUser({ _id: data.sentBy });
        data.nickname = user.admin ? 'Admin' : 'Customer';

        messageModel.createMessage(data);

        io.to(data.order).emit('message', {
            nickname: data.nickname,
            sentBy: data.sentBy,
            message: data.message,
            createdAt: new Date()
        });
    });
}

export default connection;