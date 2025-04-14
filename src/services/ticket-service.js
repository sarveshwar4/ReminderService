const sender = require('../config/serviceConfig.js');
const TicketRepository = require('../repository/ticketRepository.js');
class TicketService{
    constructor(){
        this.repo = new TicketRepository();
    }
    async sendBasicEmail(from, to, subject, body){
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
    
    async create(data){
       try {
        const response = await this.repo.create(data);
        return response;
       } catch (error) {
        throw error;
       }
    }
    
    async fetchPendingEmail(data){
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
}


module.exports = TicketService;