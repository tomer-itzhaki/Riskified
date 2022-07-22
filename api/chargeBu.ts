import Sender from './classes/sender';
import CreditFactory from './classes/creditFactory';
import { attemptCount } from '../consts.js';
import DeclineMemory from './classes/declineMemory';

const memo = DeclineMemory.getInstance();

const charge = async (body, merchant) => {
    const creditDetails = body;
    const company = creditDetails.creditCardCompany;
    delete creditDetails['creditCardCompany']
    const sender = new Sender(attemptCount);

    const card = CreditFactory.getCredit(company, creditDetails, sender)
    const result = await card.charge();
    if (result.reason)
        addFailureToHistory(result.reason, merchant)
    return result;
}

const addFailureToHistory = (reason: string, merchant: string) => {
    memo.add(merchant, reason)
}

const getHistory = (merchat: string) => {
    return memo.get(merchat)
}

export { charge, getHistory };