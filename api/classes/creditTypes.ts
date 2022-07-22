import MasterCard from './mastercard';
import Visa from './visa';

export type creditDetails = {
    fullName: string;
    creditCardNumber: string;
    expirationDate: string;
    cvv: string;
    amount: number;
}

export const creditMap = {
    'visa': Visa,
    'mastercard': MasterCard
}

export type visaBody = {
    fullName: string,
    number: string,
    expiration: string,
    cvv: string,
    totalAmount: number
}

export type masterCardBody = {
    first_name: string,
    last_name: string,
    card_number: string,
    expiration: string,
    cvv: string,
    charge_amount: number
}

export type Keys = keyof typeof creditMap;
export type creditTypes = typeof creditMap[Keys];



