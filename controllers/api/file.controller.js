import fileModel from '../../models/file.model';
import orderModel from '../../models/order.model';
import { randStr } from '../../utils/helpers';

import fs from 'fs';
import path from 'path';


async function get(req, res) {
    try {
        const order = await orderModel.findOrder({ _id: req.params.order });

        if (req.session.uid != order.belongsTo._id) {
            return res.json({
                message: 'you do not have permission to perform that action',
                success: false,
                data: null
            });
        }

        const files = await fileModel.findMany({ order: req.params.order });

        return res.json({
            message: '',
            success: true,
            data: files
        });

    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

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

        let fname = randStr(25).toLowerCase() + '.txt';

        fs.writeFileSync(path.resolve('./uploads/' + fname), req.body.value);

        const f = await fileModel.insertOne({
            originalname: fname,
            filename: fname,
            type: req.body.type,
            order: req.body.orderId,
            belongsTo: req.session.uid
        });

        return res.json({
            message: 'done, added to order!',
            success: true,
            data: f
        });
    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

async function remove(req, res) {
    try {
        const order = await orderModel.findOrder({ _id: req.body.orderId });

        if (req.session.uid != order.belongsTo._id) {
            return res.json({
                message: 'you do not have permission to perform that action',
                success: false,
                data: null
            });
        }

        await fileModel.removeOne(req.body.file);
        return res.json({
            message: 'file has been removed',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: 'an error has occured',
            success: false,
            data: null
        });
    }
}

export default { get, post, remove };