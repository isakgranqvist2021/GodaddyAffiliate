import orderModel from "../../models/order.model";

async function add(req, res) {
    try {
        await orderModel.addEvent({ _id: req.body.order }, {
            createdAt: new Date(),
            message: req.body.event
        });
        req.session.alert = { type: 'success', message: 'event has been added' };
        return res.redirect(req.headers.referer);
    } catch (err) {
        return res.redirect(req.headers.referer);
    }
}

async function remove(req, res) {
    await orderModel.removeEvent({ _id: req.query.order }, parseInt(req.query.ev));
    req.session.alert = { type: 'success', message: 'event has been removed' };
    return res.redirect(req.headers.referer);
}


async function completed(req, res) {
    try {
        await orderModel.markOrder({ _id: req.body.order }, true);
        req.session.alert = { type: 'success', message: 'order has been marked as completed' };
        return res.redirect(req.headers.referer);
    } catch (err) {
        req.session.alert = { type: 'error', message: 'an error has occured' };
        return res.redirect(req.headers.referer);
    }
}

export default { add, remove, completed };