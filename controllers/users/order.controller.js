import orderModel from "../../models/order.model";
import messageModel from '../../models/message.model';

async function get(req, res) {
    try {
        const order = await orderModel.findOrder({ _id: req.params.id });
        const messages = await messageModel.findMessages({ order: order._id });

        if (req.session.uid !== JSON.stringify(order.belongsTo._id) && !req.user.admin) {
            return res.redirect('/users/orders');
        }

        return res.render('users/order', {
            user: req.user,
            order: order,
            messages: messages,
            alert: req.consumeAlert()
        });
    } catch (err) {
        req.session.alert = { type: 'error', message: 'an error has occured' };
        return res.redirect('/');
    }
}

export default { get };