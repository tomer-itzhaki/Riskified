import Sender from './classes/sender';
import CreditFactory from './classes/creditFactory';
import { attemptCount } from '../consts.js';
import DeclineMemory from './classes/declineMemory';

const memo = DeclineMemory.getInstance();

const charge = (body) => {
    const creditDetails = body;
    const company = creditDetails.creditCardCompany;
    delete creditDetails['creditCardCompany']
    const sender = new Sender(attemptCount);

    const card = CreditFactory.getCredit(company, creditDetails, sender)

    return card.charge();
}

const addHistory = (answer: string, merchant: string) => {
    if (answer)
        memo.add(merchant, answer)
}

const getHistory = (merchat: string) => {
    return memo.get(merchat)
}

export { charge, addHistory, getHistory };