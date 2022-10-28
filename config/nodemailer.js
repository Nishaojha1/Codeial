const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment')

// this part sends the email and tells how the communication is going to work 
let transporter = nodemailer.createTransport(env.smtp);

    // render template defines whenever  I try to send a HTML email where the file will be placed inside views and the mailers
let renderTemplate = (data, relativePath) => {
    // define a variable where I will be storing what all HTML is being sent to that mail
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering template', err); return}


            mailHTML = template;
        }
    )

    return mailHTML;

}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}