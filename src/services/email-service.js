const sender = require('../config/serviceConfig.js');
const TicketRepository = require('../repository/ticketRepository.js');
class TicketService{
    constructor(){
        this.repo = new TicketRepository();
        this.SubscribeEvents = this.SubscribeEvents.bind(this);
    }
    async sendBasicEmail({from, to, subject, body}){
        try {
            sender.sendMail({
                from:from,
                to:to,
                subject:subject,
                text:body
            });
        } catch (error) {
            console.log("Error in sending email: ", error);
        }
    };
    
    async createNotificationTicket(data){
       try {
        const response = await this.repo.create(data);
        return response;
       } catch (error) {
        throw error;
       }
    }
    
    async fetchPendingEmails(data){
       try {
        const response = await this.repo.get(data);
        return response;
       } catch (error) {
        throw error;
       }
    }
    async updateTicket(ticketId, data){
        try {
            const response = await this.repo.update(ticketId, data);
            return response;
        } catch (error) {
            throw error;
        }
    }

   async SubscribeEvents(payload){
     const service = payload.service;
     const data = payload.data;
     switch(service){
        case 'Ticket-Service':
            await this.createNotificationTicket(data);
            break;
        case 'Send-Email-Service':
            await this.sendBasicEmail(data);
            break;
        default:
            console.log("Service is not present");
            break;        
     }
   }
}


module.exports = TicketService;