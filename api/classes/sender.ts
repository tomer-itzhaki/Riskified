import axios from 'axios';
import axiosRetry from 'axios-retry';

class Sender {
    private numberOfTries: number;

    constructor(numberOfTries) { this.numberOfTries = numberOfTries }

    async send(method: string, url: string, data: any, headers: any): Promise<any> {
        try {

            axiosRetry(axios, {
                retries: this.numberOfTries,
                retryDelay: (retryCount) => {
                    console.log(`retry attempt: ${retryCount}`);
                    return Math.pow(2, retryCount) * 1000;
                },
                retryCondition: (error) => {
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
            return { status: e.response.status, data: e.response.data }
        }
    }
}

export default Sender;
