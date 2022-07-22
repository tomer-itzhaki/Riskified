import express from 'express';
const app = express()
const bodyParser = require('body-parser')
import {port} from './consts';
import api from './api/index';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use('/api', api)

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})