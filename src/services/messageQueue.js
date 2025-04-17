const amqplib = require('amqplib');
const {EXCHANGE_NAME, MESSAGE_BROKER_URL}  = require('../config/serverconfig');
// RabbitMQ ke saath connection banaakar ek channel create karne wala function
const createChannel = async () => {
    try {
        // RabbitMQ server ke saath connection establish kar rahe hain
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        
        const channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, 'direct', false);

        return channel; 
    } catch (error) {
        throw error;
    }
};

// Message ko consume (receive) karne ke liye subscriber function
const Subscriber = async (channel, service, binding_key) => {
    try {
       const applicationQueue =  await channel.assertQueue('QUEUE_NAME');

      
        await channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

         await channel.consume(applicationQueue.queue, msg => {
            console.log("Message receive hua:");
            console.log(msg.content.toString());
            const payLoad = JSON.parse(msg.content.toString());
            service(payLoad);
            
            channel.ack(msg); 
        });
    } catch (error) {
        throw error;
    }
};

// Message bhejne (publish) ke liye function
const publisher = async(channel, binding_key, msg) => {
    try {
        // Queue ko ensure kar rahe hain ki exist karti ho
        channel.assertQueue('QUEUE_NAME');

        // Exchange par message publish kar rahe hain, jisme routing key specify kar rahe hain
        // msg ko Buffer mein convert karna zaroori hai
       await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(msg));
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createChannel,
    Subscriber,
    publisher
};
