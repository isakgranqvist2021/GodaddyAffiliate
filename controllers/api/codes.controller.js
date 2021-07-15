import fs from 'fs';
import path from 'path';

function get(req, res) {
    const codes = JSON.parse(fs.readFileSync(path.resolve('.', path.join('./data/codes.json'))));

    console.log(codes);

    return res.json({
        message: 'found some codes',
        success: true,
        data: codes
    });
}

export default { get };