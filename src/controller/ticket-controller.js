const TicketService = require('../services/ticket-service');
const ticketService = new TicketService();

const create = async(req, res) =>{
    try {
        const response = await ticketService.create(req.body);
        return res.status(201).json({
            data:response,
            success:true,
            message:'Notification-ticket added successfully',
            err:{}
        });
    } catch (error) {
        return res.status(201).json({
            data:{},
            success:true,
            message:'something wrong thats why ticket is not added',
            err:error
        });
    }
}

module.exports={
    create
}