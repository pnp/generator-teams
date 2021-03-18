import * as https from "https";
import * as debug from "debug";

// Require SSL selfsigned certificate generation
const selfsigned = require("selfsigned");

// Require file system access
const fs = require("fs");

// Initialize debug logging module
const log = debug("msteams");

// Certificate lifetime (days)
const lifetime: number = 120;

// Define the certificate creation extensions for localhost
const selfSignedExtensions = [
    {
        name: "basicConstraints",
        cA: true
    },
    {
        name: "keyUsage",
        keyCertSign: true,
        digitalSignature: true,
        nonRepudiation: true,
        keyEncipherment: true,
        dataEncipherment: true
    },
    {
        name: "subjectAltName",
        altNames: [
            {
                type: 2,
                value: "localhost"
            },
            {
                type: 2,
                value: "localhost.localdomain"
            },
            {
                type: 2,
                value: "[::1]"
            },
            {
                // type 7 is IP
                type: 7,
                ip: "127.0.0.1"
            },
            {
                type: 7,
                ip: "fe80::1"
            }
        ]
    }
];

export const selfSignedLogic = {
    getSelfSignedOptions(): https.ServerOptions {

        // Define the target self-signed certificate path
        const certPath = `${__dirname}../../server.pem`;

        // Let's see if the self-signed certificate exists
        let certExists = fs.existsSync(certPath);
        if (certExists) {

            log(`Using self-signed certificate: ${certPath}`);

            // And let's see if it is still valid
            const certStat = fs.statSync(certPath);
            const certTtl = 1000 * 60 * 60 * 24;
            const now = new Date();

            // cert is more than 120 days old, let's create a new one
            if ((now.getTime() - certStat.ctime.getTime()) / certTtl > lifetime) {
                log("SSL Certificate is more than 120 days old. Removing.");
                fs.unlinkSync(certPath);
                certExists = false;
            }
        }

        // If the self-signed certificate doesn't exist
        if (!certExists) {
            // Let's create it from scratch
            log("Generating a new SSL self-signed certificate");
            const attrs = [{ name: "commonName", value: "localhost" }];
            const pems = selfsigned.generate(attrs, {
                algorithm: "sha256",
                days: lifetime,
                keySize: 2048,
                extensions: selfSignedExtensions
            });

            fs.writeFileSync(certPath, pems.private + pems.cert, {
                encoding: "utf-8"
            });

            log(`Self-signed certificate stored on: ${certPath}`);
        }

        const selfSignedCert = fs.readFileSync(certPath);

        const sslOptions = {
            key: selfSignedCert,
            cert: selfSignedCert
        };

        return sslOptions;
    }
};
