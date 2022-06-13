const app = require("./app");
const kafka = require("kafka-node");
const { exec } = require("child_process");
require("./database");

app.listen(app.get("port"), () => {
  console.log("Server listening in port", app.get("port"));
});

exec("docker exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --topic daily", (error, stdout, stderr) => {});
exec("docker exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --topic hourly", (error, stdout, stderr) => {});

require("./producers/producerDaily");
require("./producers/producerHourly");
require("./consumers/consumerDaily");
require("./consumers/consumerHouly");
