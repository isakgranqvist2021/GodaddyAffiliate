import orderModel from "../../models/order.model";
import messageModel from '../../models/message.model';

async function get(req, res) {
    try {
        const order = await orderModel.findOrder({ _id: req.params.id });
        const messages = await messageModel.findMessages({ order: order._id });

        order.belongsTo._id = order.belongsTo._id.toString();

        if (req.session.uid !== order.belongsTo._id && !req.user.admin) {
            return res.redirect('/users/orders');
        }

        return res.render('users/order', {
            title: 'Order',
            user: req.user,
            order: order,
            messages: messages
        });
    } catch (err) {
        req.session.alert = { type: 'error', message: 'an error has occured' };
        return res.redirect('/');
    }
}

export default { get };

