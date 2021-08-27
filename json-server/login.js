const users = [
    { username: "stefany", password: '1234', token: 'abc', id: 1 },
    { username: "maria", password: '4321', token: 'xyz', id: 2 }
];

module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/login') {
        for (let user of users) {
            if (req.body.username === user.username && req.body.password === user.password) {
                return res.status(200).json({ token: user.token, id: user.id });
            }
        }
        res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    } else {
        next();
    }
}
