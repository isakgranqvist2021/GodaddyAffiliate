import orderModel from "../../models/order.model";

async function get(req, res) {
    const orders = await orderModel.findOrders({});
    return res.render('admin/home', {
        user: req.user,
        orders: orders,
        alert: req.consumeAlert()
    });
}

export default { get };