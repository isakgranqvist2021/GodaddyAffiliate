import meetingModel from "../../models/meeting.model";

async function create(req, res) {
    console.log(req.body);
    return res.json({});
}

export default { create };