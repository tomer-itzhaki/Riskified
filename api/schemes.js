const yup = require('yup');
const { creditCardCompanies, cardDateRegex } = require('../consts')


let charge = yup.object().shape({
    body: yup.object().shape({
        fullName: yup.string().required(),
        creditCardNumber: yup.string().required(),
        creditCardCompany: yup.string().oneOf(creditCardCompanies).required(),
        expirationDate: yup.string().matches(cardDateRegex).required(),
        cvv: yup.string().required(),
        amount: yup.number().required()
    }).required(),
    headers: yup.object().shape({
        'merchant-identifier': yup.string().required()
    }).required()
});


const schemeDic = {
    charge
}


function getSchemaCheckerMW(schema) {
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

module.exports = getSchemaCheckerMW;