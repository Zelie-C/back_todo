import 'dotenv/config'
import express from 'express'

let app = express();
const port = parseInt(process.env.PORT as string);

app.get(('/toto'), function (req, res) {
    res.send('toto')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
