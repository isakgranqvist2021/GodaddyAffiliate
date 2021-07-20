import cloud from '../../utils/cloud';
import fileModel from '../../models/file.model';
import orderModel from '../../models/order.model';

async function upload(req, res) {

    const files = await Promise.all(req.files.map(async (file) => {
        return await cloud.upload(file.filename);
    }));

    return res.json({
        message: `${req.files.length} files uploaded`,
        success: true,
        data: files
    });
}


async function post(req, res) {
    console.log(req.body);
    console.log(req.files);

    try {
        const order = await orderModel.findOrder({ _id: req.body.orderId });

        if (req.session.uid != order.belongsTo._id) {
            return res.json({
                message: 'you do not have permission to perform that action',
                success: false,
                data: null
            });
        }

        let data = req.files.map(file => {
            return {
                filename: file.filename,
                originalname: file.originalname,
                type: req.body.type,
                order: req.body.orderId,
                belongsTo: req.session.uid
            }
        });

        const docs = await fileModel.insertMany(data);
        return res.json({
            message: `uploaded ${docs.length} files`,
            success: true,
            data: docs
        });
    } catch (err) {
        return res.json({
            message: 'an error occured',
            success: false,
            data: null
        });
    }
}


export default { upload, post };