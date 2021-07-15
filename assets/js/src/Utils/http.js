const env = 'production';

const serverAddr = env === 'development' ? 'http://localhost:8080/api' : 'https://marina-media.herokuapp.com/api';

async function GET(url) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        return await response.json();
    } catch (err) {
        return Promise.resolve(err);
    }
}

async function POST(url, body, headers = { 'Content-Type': 'application/json' }) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'POST',
            body: body,
            headers: headers
        });

        return await response.json();
    } catch (err) {
        console.log('error');
        console.log(err);
        return Promise.reject(err);
    }
}

async function PUT(url, body, headers = { 'Content-Type': 'application/json' }) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'PUT',
            body: body,
            headers: headers
        });

        console.log(response.status);

        return await response.json();
    } catch (err) {
        console.log('error');
        console.log(err);
        return Promise.reject(err);
    }
}

async function DELETE(url) {

}

export default { GET, POST, PUT, DELETE, serverAddr };