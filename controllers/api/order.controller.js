import fileModel from '../../models/file.model';
import orderModel from '../../models/order.model';

async function post(req, res) {
    try {
        const order = await orderModel.findOrder({ _id: req.body.orderId });

        if (req.session.uid != order.belongsTo._id) {
            return res.json({
                message: 'you do not have permission to perform that action',
                success: false,
                data: null
            });
        }

        const doc = await fileModel.insertOne({
            filename: file.filename,
            originalname: file.originalname,
            type: req.body.type,
            order: req.body.orderId,
            belongsTo: req.session.uid
        });

        return res.json({
            message: 'added text to order',
            success: true,
            data: doc
        });
    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

export default { post };