const app = require("./app");
const kafka = require("kafka-node");
const { exec } = require("child_process");
require("./database");

app.listen(app.get("port"), () => {
  console.log("Server listening in port", app.get("port"));
});

exec("docker exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --topic test", (error, stdout, stderr) => {});

require("./consumers/consumer1");
require("./producers/producer1");

// const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'})

// /* Consumidor */
// var consumer = new kafka.Consumer(client, [ { topic: 'test' } ])
// consumer.on('message', function (message) {
// 	console.log(message)
// })

// /* Productor */
// var producer = new kafka.Producer(client)

// producer.on('ready', function() {
// 	var interval = setInterval(function () {
// 		producer.send( [ { topic: "test", messages: "Hola cada 5 segundos" } ], function(err, data) {})
// 	}, 5000)
// })

// /opt/bitnami/kafka/bin/kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic test
// docker exec kafka /opt/bitnami/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --create --topic test

// hacer un topic por comuna y tipo de consulta
// PuenteAlto-Diario
// PuenteAlto-Hora
