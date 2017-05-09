import * as builder from 'botbuilder';
import * as express from 'express';


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
     * Implement your bot logic here
     * @param req the Request
     * @param res the Response
     * @param next 
     */
    requestHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
        // parse the incoming message
        var incoming = <builder.IMessage>req.body
        
        // create the response, any Teams compatible responses can be used
        var message = new builder.Message();
        message.text(`Echo ${incoming.text}`);
        
        // send the message
        res.send(message.toMessage());
    }
}