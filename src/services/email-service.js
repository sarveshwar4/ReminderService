const sender = require('../config/serviceConfig.js');

const sendEmail = async(from, to, subject, body)=>{
    try {
        sender.sendMail({
            from:from,
            to:to,
            subject:subject,
            text:body
        });
        console.log("Email Sent Successfully");
    } catch (error) {
        console.log("Error in sending email: ", error);
    }
};

module.exports = {sendEmail};