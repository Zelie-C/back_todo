import 'dotenv/config'
import express from 'express'

let app = express();
const port = parseInt(process.env.PORT as string);

app.get('/toto', function (req, res) {
    res.send('toto')
})

app.get('/test/:value', function (req, res) {
    let taskValue: string = req.params.value;
    res.send(`test ${taskValue}`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
