import Credit from './credit';
import { visaFailure } from '../../consts';
import { visaBody } from './creditTypes';

class Visa extends Credit {

    async charge() {

        const body: visaBody = {
            fullName: this.details.fullName,
            number: this.details.creditCardNumber,
            expiration: this.details.expirationDate,
            cvv: this.details.cvv,
            totalAmount: this.details.amount
        }
        const [firstName] = this.details.fullName.split(' ');
        const result = await this.sender.send('POST', this.url, body, { identifier: firstName })
        return this.resultLogic(result);
    }

    resultLogic(result) {
        if (result.status == 200) {
            const hasFailed = result.data.chargeResult == visaFailure;
            return this.getResponse(result.status, hasFailed,result.data.resultReason);
        }
        else {
            return this.getResponse(500, true,null)
        }
    }
}


export default Visa;