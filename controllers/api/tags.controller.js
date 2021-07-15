import fs from 'fs';

function getTags(req, res) {
    let tags = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/tags.json'))));

    return res.json({
        message: `found ${tags.length} tags`,
        success: true,
        data: tags
    });
}

export default getTags;