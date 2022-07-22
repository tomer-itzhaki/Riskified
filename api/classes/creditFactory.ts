import Credit from './credit';
import { creditDetails, creditMap, Keys, creditTypes } from './creditTypes';
import { creditUrlsMap } from '../../consts'
import Sender from './sender';



export default class CreditFactory {
    static factoryMap: { [key: string]: creditTypes } = creditMap;
    private constructor() {

    }

    static getCredit(type: Keys, details: creditDetails, sender: Sender): Credit {
        return new this.factoryMap[type](details, creditUrlsMap[type], sender);
    }
}