import express from 'express';
import bodyParser from 'body-parser'
import { port } from './consts';
import api from './api/index';

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/api', api)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})