import * as yup from 'yup'
import { creditCardCompanies, cardDateRegex, merchantIdentifier } from '../consts'


const charge = yup.object().shape({
    body: yup.object().shape({
        fullName: yup.string().required(),
        creditCardNumber: yup.string().required(),
        creditCardCompany: yup.string().oneOf(creditCardCompanies).required(),
        expirationDate: yup.string().matches(cardDateRegex).required(),
        cvv: yup.string().required(),
        amount: yup.number().required()
    }).required(),
    headers: yup.object().shape({
        [merchantIdentifier]: yup.string().required()
    }).required()
});


const schemeDic = {
    charge
}


const getSchemaCheckerMW = (schema) => {
    return async (req, res, next) => {
        try {
            let isValid = await schemeDic[schema].isValid(req)
            isValid ? next() : res.status(400).send({})
        }
        catch {
            res.status(500).send({})
        }
    }
}

export { getSchemaCheckerMW };