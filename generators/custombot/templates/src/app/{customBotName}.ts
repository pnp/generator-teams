import * as builder from 'botbuilder';
import * as express from 'express';
import * as crypto from 'crypto';


/**
 * Implementation for <%= customBotTitle %>
 */
export class <%= customBotName %> {

    /**
     * The constructor
     */
    constructor() {
       
    }

    /**
     * Implement your outgoing webhook logic here
     * @param req the Request
     * @param res the Response
     * @param next 
     */
    requestHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
        // parse the incoming message
        let incoming = <builder.IMessage>req.body

        // create the response, any Teams compatible responses can be used
        let message = new builder.Message();
        
        const securityToken = process.env.SECURITY_TOKEN;
        if (securityToken && securityToken.length > 0) {
            // There is a configured security token
            const auth = req.headers['authorization'];
            const msgBuf = Buffer.from((<any>req).rawBody, 'utf8');
            const msgHash = "HMAC " + crypto.
                createHmac('sha256', new Buffer(<string>securityToken, "base64")).
                update(msgBuf).
                digest("base64");

            if (msgHash == auth) {
                // Message was ok and verified
                message.text(`Echo ${incoming.text}`);
            } else {
                // Message could not be verified
                message.text(`Error: message sender cannot be verified`);
            }
        } else {
            // There is no configured security token
            message.text(`Error: outgoing webhook is not configured with a security token`);
        }

        // send the message
        res.send(message.toMessage());
    }
}