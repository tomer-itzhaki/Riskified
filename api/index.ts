import express from 'express';
import { getSchemaCheckerMW } from './schemes';
import { charge, getHistoryByMerchant } from './chargeBu';
import { merchantIdentifier } from '../consts';

const router = express.Router()


router.post('/charge', getSchemaCheckerMW('charge'), async (req, res) => {
    try {
        const merchant = req.headers[merchantIdentifier];
        const result = await charge({ ...req.body }, merchant);
        res.status(result.status).send(result.data);
    }
    catch {
        res.status(500).send({})
    }

})

router.get('/chargeStatuses', (req, res) => {
    const merchant = req.headers[merchantIdentifier];
    const result = getHistoryByMerchant(merchant as string);
    return res.status(200).send(result)
})


export default router;