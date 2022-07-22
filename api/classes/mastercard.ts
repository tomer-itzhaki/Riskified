import Credit from './credit';
import { masterCardBody } from './creditTypes';
import { restRequest, masterCardFail } from '../../consts';

class MasterCard extends Credit {

    async charge() {
        const [first_name, last_name] = this.details.fullName.split(' ');
        const body: masterCardBody = {
            first_name,
            last_name,
            card_number: this.details.creditCardNumber,
            expiration: this.details.expirationDate.split('/').join('-'),
            cvv: this.details.cvv,
            charge_amount: this.details.amount
        }

        const result = await this.sender.send(restRequest.POST, this.url, body, { identifier: first_name })

        return this.handleResponse(result)
    }

    handleResponse(result) {
        const hasFailed = result.status == 200 ? false : true;
        return this.getResponse(result.status, hasFailed, result.data[masterCardFail]);
    }



}

export default MasterCard;