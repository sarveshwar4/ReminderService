const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const { PORT } = require('./config/serverconfig.js');
const TicketService = require('./services/ticket-service.js');
const{create} = require('./controller/ticket-controller.js');
const { setUpJob } = require('./services/job.js');
const setUpAndStartServer = ()=>{
   const app = express();
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   const ticketService = new TicketService();
   app.post('/api/v1/ticket/create', create);
   app.listen(PORT,()=>{
       console.log(`Server is listening on port ${PORT}`);
    //    cron.schedule('*/30 * * * * *',()=>{
    //     ticketService.sendBasicEmail(
    //         "admin@123",
    //         "sarveshwarkumarshukla@gmail.com",
    //        "Test Email",
    //       "This is a test email sent from the server."
    //      );
    //    })
    setUpJob();
   });
}
setUpAndStartServer();