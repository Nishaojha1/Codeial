//For logging purppose
const morgan = require('morgan')
const path = require('path')
const rfs = require('rotating-file-stream');
const fs = require("fs");

var logDirectory = path.join(__dirname, "..",'production_logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
var accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
  })

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahhhsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        // for TSL 
        port: 587,
        // we dont want 2 factor authentication
        secure: false,
        auth: {
            user: 'its.nishaojha@gmail.com',
            pass: 'kpakqawopeutdqcs',
    
        }
    },
    
        google_client_id: '793413041753-pce1u1n8p9crlcf1ftrk267nou1dn02n.apps.googleusercontent.com',
        google_client_secret: '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',
        google_callback_url: 'http://localhost:8000/users/auth/google/callback',
        jwt_secret: 'codeial',
        morgan : {
            mode : "dev",
            options : {stream: accessLogStream}
          }}

const production ={
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: 'ajgkltZ492d8t6blnHKuqfgaplouPKN0',
    db: 'codeial_production',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        // for TSL 
        port: 587,
        // we dont want 2 factor authentication
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD,
    
        }
    },
    
        google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
        google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
        google_callback_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
        jwt_secret: process.env.CODEIAL_JWT_SECRET,
        morgan : {
            mode : "combined",
            options : {stream: accessLogStream}
          }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
