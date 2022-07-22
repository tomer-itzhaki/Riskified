import { creditDetails } from "./creditTypes";
import Sender from "./sender";
import Response from './responseBuilder';

abstract class Credit {
    details: creditDetails;
    url: string
    sender: Sender
    constructor(details: creditDetails, url: string, sender: Sender) {
        this.details = details;
        this.url = url;
        this.sender = sender;
    }

    abstract charge(): any
    abstract resultLogic(result: any)
    getResponse(status: number, hasFailed: boolean,reason:string) {
        return Response.buildResponse(status, hasFailed,reason)
    }
}

export default Credit;

