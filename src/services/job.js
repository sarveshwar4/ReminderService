const cron = require("node-cron");
const TicketService = require("./ticket-service");
const sender = require("../config/serviceConfig");
const ticketservice = new TicketService();
const setUpJob = () => {
  cron.schedule("*/10 * * * * *", async () => {
    const response = await ticketservice.getNotificationTicket({
      status: "PENDING",
    });
    response.forEach((email)=>{
        sender.sendMail({
            from:'admin@.com',
            to:email.recipiantEmail,
            subject:email.subject,
            text:email.content
        }, async(err, data)=>{
            if(err){
                console.log(err);
            }
            else{
                const response = await ticketservice.updateTicket(email.id, {status :'SUCCESS'});
                console.log(response);
            }
        });
    })
  });
};

module.exports = { setUpJob };
