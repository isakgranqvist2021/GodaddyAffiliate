function randStr(n = 10) {
    let runes = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890_!'.split('');
    let val = '';

    for (let i = 0; i < n; i++)
        val += runes[Math.floor(Math.random() * runes.length)];

    return val;
}

export default randStr;