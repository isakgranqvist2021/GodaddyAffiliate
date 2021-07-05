import userModel from "../models/user.model";

async function findUser(req, res, next) {
    let user = await userModel.findUser({ _id: req.session.uid });
    req.user = user;
    return next();
}

export default findUser;