import orderModel from "../../models/order.model";

async function get(req, res) {
    const orders = await orderModel.findOrders({});
    return res.render('admin/orders', {
        title: 'Orders',
        user: req.user,
        orders: orders
    });
}

export default { get };
