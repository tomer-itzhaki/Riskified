import axios from 'axios'; // axios = require('axios');
const axiosRetry = require('axios-retry');
class Sender {
    numberOfTries: number;

    constructor(numberOfTries) { this.numberOfTries = numberOfTries }

    async send(method: string, url: string, data: any, headers: any): Promise<any> {
        try {

            axiosRetry(axios, {
                retries: this.numberOfTries,
                retryDelay: (retryCount) => {
                    console.log(`retry attempt: ${retryCount}`);
                    return Math.pow(2, retryCount) * 1000; // time interval between retries
                },
                retryCondition: (error) => {
                    // if retry condition is not specified, by default idempotent requests are retried
                    return error.response.status >= 500;
                },
            })

            const result = await axios({
                method,
                url,
                data,
                headers
            })

            return { status: result.status, data: result.data }
        }
        catch (e) {
            return e.response
        }
    }
}

export default Sender;
