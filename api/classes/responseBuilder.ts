import { errorMessage } from '../../consts.js'

class Response {
    static buildSuccessResponse() {
        return { status: 200, data: {} };

    }

    static buildFailedResponse(status: number, reason: string) {
        const result = { status };
        if (status >= 500)
            result['data'] = {}
        else {
            result['data'] = { "error": errorMessage }
            result['reason'] = reason;
        }

        return result;
    }
}

export default Response;