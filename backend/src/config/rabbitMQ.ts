import amqp from "amqplib";

const amqpUrl = "amqp://127.0.0.1:5672";
// const amqpUrl = "amqp://34.207.79.90:5672";

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(amqpUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue("enterRecordQueue", { durable: true });
    return channel;
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
    process.exit(1);
  }
};
