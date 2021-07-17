import orderModel from '../../models/order.model';

async function get(req, res) {
    const orders = await orderModel.findOrders({ belongsTo: req.session.uid });

    return res.render('users/orders', {
        title: 'My Orders',
        orders: orders,
        user: req.user
    });
}


export default { get };

