const RabbitmqWrapper = require("../middleware/rabbitmq");

const url = "amqp://guest:guest@localhost";

exports.push_my_message = async (req, res, next) => {
  const userId = req.params.user_id;

  try {
    const queueName = "MQ_test" + userId;
    const rq = new RabbitmqWrapper(url, queueName);

    await rq.send_helloWorld();

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.pop_my_message = async (req, res, next) => {
  const userId = req.params.user_id;

  try {
    const url = "amqp://guest:guest@localhost";
    const queueName = "MQ_test" + userId;
    const rq = new RabbitmqWrapper(url, queueName);

    const msg = await rq.recv_helloWorld();
    res.status(200).send(msg);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
