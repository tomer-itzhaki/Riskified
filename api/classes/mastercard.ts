import Credit from './credit';
import { masterCardBody } from './creditTypes';

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

        const result = await this.sender.send('POST', this.url, body, { identifier: first_name })

        return this.resultLogic(result)
    }

    resultLogic(result) {
        if (result.status == 200 || result.status == 400) {
            const hasFailed = result.status == 400;
            return this.getResponse(200, hasFailed, hasFailed ? result.data['decline_reason'] : null);
        }
        else {
            return this.getResponse(500, true, null)
        }
    }
}

export default MasterCard;