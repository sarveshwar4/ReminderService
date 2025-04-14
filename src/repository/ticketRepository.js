const { where } = require("sequelize");
const { NotificationTicket } = require("../models/index");
const { Op } = require("sequelize");

class TicketRepository {
  async create(data) {
    try {
      const response = await NotificationTicket.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async get(filter) {
    try {
      //  { data : {status : PENDING}}
      const response = await NotificationTicket.findAll({
        where: {
          status: filter.status,
          notificationTime: {
            [Op.lte]: new Date(),
          },
        },
      });
      return response;
    } catch (error) {}
  }

  async getALL() {
    try {
      const response = await NotificationTicket.findAll();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(ticketId, data) {
    try {
      const response = await NotificationTicket.findByPk(ticketId);

      if (!response) throw new Error("Notification not found");

      if (data.status) response.status = data.status;

      await response.save();
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketRepository;
