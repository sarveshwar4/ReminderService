const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { PORT } = require('./config/serverconfig.js');
const { sendEmail } = require('./services/email-service.js');
const setUpAndStartServer = ()=>{
   const app = express();
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.listen(PORT,()=>{
       console.log(`Server is listening on port ${PORT}`);
       cron.schedule('*/30 * * * * *',()=>{
        sendEmail(
            "admin@123",
            "sarveshwarkumarshukla@gmail.com",
           "Test Email",
          "This is a test email sent from the server."
         );
       })
 
   });
}
setUpAndStartServer();