import { errorMessage } from '../../consts.js'
class Response {
    static buildResponse(status, hasFailed, reason: string) {
        const result = { status };
        if (hasFailed) {
            if (status >= 500)
                result['data'] = {}
            else {
                result['data'] = { "error": errorMessage }
                result['reason'] = reason;
            }
        }
        else {
            result['data'] = {}
        }
        return result;
    }
}

export default Response;