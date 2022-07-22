import express from 'express';
const router = express.Router()
const getSchemaCheckerMW = require('./schemes.js');
import { charge, getHistory } from './chargeBu';


//to delete
router.get('/check', (req, res) => {
    res.status(200).send('lets go!')
})

router.post('/charge', getSchemaCheckerMW('charge'), async (req, res) => {
    try {
        const merchant = req.headers['merchant-identifier'];
        const result = await charge({ ...req.body }, merchant);
        res.status(result.status).send(result.data);
    }
    catch {
        res.status(500).send({})
    }

})

router.get('/chargeStatuses', (req, res) => {
    const merchant = req.headers['merchant-identifier'];
    const result = getHistory(merchant as string);
    return res.status(200).send(result)
})


export default router;