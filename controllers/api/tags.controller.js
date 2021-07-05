import { tags } from "../../utils/tags";

function getTags(req, res) {
    return res.json({
        message: `found ${tags.length} tags`,
        success: true,
        data: tags
    });
}

export default getTags;