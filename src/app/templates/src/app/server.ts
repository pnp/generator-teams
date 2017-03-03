import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as https from 'https';
import * as http from 'http';
import * as path from 'path';
import * as morgan from 'morgan';

let express = Express();
let port = process.env.port || process.env.PORT || 3007;

express.use(bodyParser.json());

express.use(morgan('tiny'));

express.use('/scripts', Express.static(path.join(__dirname, 'scripts')));
express.use('/assets', Express.static(path.join(__dirname, 'assets')));
express.use('/index.html', Express.static(path.join(__dirname, 'index.html')));
express.use('/config.html', Express.static(path.join(__dirname, 'config.html')));
express.use('/remove.html', Express.static(path.join(__dirname, 'remove.html')));

express.use('/tou.html', Express.static(path.join(__dirname, 'tou.html')));
express.use('/privacy.html', Express.static(path.join(__dirname, 'privacy.html')));


express.set('port', port);
http.createServer(express).listen(port, (err: any) => {
    if (err) {
        return console.error(err);
    }
    console.log(`Server running on ${port}`);

})
