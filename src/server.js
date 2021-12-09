const app = require(".")
const connect = require("./configs/db")

app.listen(1234, async () => {
    await connect();
    console.log('listening to port 1234')
})