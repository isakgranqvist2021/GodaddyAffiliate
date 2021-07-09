import fs from 'fs';

function get(req, res) {
    const codes = JSON.parse(fs.readFileSync('./data/codes.json'));

    return res.json({
        message: 'found some codes',
        success: true,
        data: codes
    });
}

export default { get };