import Credit from './credit';
import { visaFailure, restRequest } from '../../consts';
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
        const result = await this.sender.send(restRequest.POST, this.url, body, { identifier: firstName })
        return this.handleResponse(result);
    }

    handleResponse(result) {
        const hasFailed = result.status == 200 ? result.data.chargeResult == visaFailure : true
        return this.getResponse(result.status, hasFailed, result.data.resultReason);

    }
}


export default Visa;