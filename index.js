const server = require('./server');

const port = 4000;

server.listen(port, () => {
    console.log(`\n*** Listening on http://localhost:${port} ***\n`)
})