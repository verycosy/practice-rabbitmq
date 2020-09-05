const amqp = require("amqplib");

class RabbitmqWrapper {
  constructor(url, queueName, options) {
    this._url = url;
    this._queueName = queueName;
    this._options = options || {};

    this.channel = undefined;
    this.queue = undefined;
  }

  async setup() {
    const connect = await amqp.connect(this._url);
    const channel = await connect.createChannel();
    this.channel = channel;
  }

  async assertQueue() {
    const queue = await this.channel.assertQueue(this._queueName, {
      durable: false,
    });
  }

  async sendToQueue(msg) {
    const sending = await this.channel.sendToQueue(
      this._queueName,
      this.encode(msg),
      { persistent: true }
    );

    return sending;
  }

  async recvFromQueue() {
    const message = await this.channel.get(this._queueName, {});

    if (message) {
      this.channel.ack(message);
      return message.content.toString();
    }

    return null;
  }

  encode(doc) {
    return Buffer.from(JSON.stringify(doc));
  }

  async send_helloWorld() {
    await this.setup();
    await this.assertQueue();
    await this.sendToQueue("helloWorld");
  }

  async recv_helloWorld() {
    await this.setup();
    return await this.recvFromQueue();
  }
}

module.exports = RabbitmqWrapper;
