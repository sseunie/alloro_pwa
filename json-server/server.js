const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const users = [
    { username: "stefany", password: '1234', token: 'abc', id: 1 },
    { username: "maria", password: '4321', token: 'xyz', id: 2 }
];

server.use(middlewares)

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST' && req.path === '/login') {
        for (let user of users) {
            if (req.body.username === user.username && req.body.password === user.password) {
                return res.status(200).jsonp({ token: user.token, id: user.id })
            }
        }
        res.status(400).jsonp({ message: 'Usuario o contraseña incorrectos' })
    } else if (req.method === 'PATCH' && req.path.startsWith('/users/') && req.path.endsWith('/inbox')) {
        const id = parseInt(req.path.split('/')[2])
        const db = router.db
        const inboxName = req.body.incidences ? 'incidences' : 'notifications'
        const value = parseInt(req.body[inboxName])
        const ids = db.get('inbox').find({id}).get(inboxName).value()
        if (!ids.includes(value)) ids.push(value)
        db.get('inbox')
            .find({id}).get(inboxName)
            .assign( inboxName === 'notifications' ? { notifications: ids } : { incidences: ids })
            .write()
        res.sendStatus(200)
    } else {
        next()
    }
})

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
