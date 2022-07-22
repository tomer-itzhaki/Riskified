const port = 8000;
const creditCardCompanies = ['visa', 'mastercard']
const cardDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
const creditUrlsMap = {
    'visa':'https://interview.riskified.com/visa/api/chargeCard',
    'mastercard' : 'https://interview.riskified.com/mastercard/capture_card'
}

const errorMessage = 'Card declined'

const attemptCount = 3;
const visaFailure = 'Failure'

module.exports = {
    port,
    creditCardCompanies,
    cardDateRegex,
    creditUrlsMap,
    attemptCount,
    errorMessage,
    visaFailure
}