const axios = require("axios");
const kafka = require("kafka-node");
var communes = require("../../communes.json");
const client = new kafka.KafkaClient({ kafkaHost: "127.0.0.1:9092" });

const urlHourly =
  "https://pro.openweathermap.org/data/2.5/forecast/hourly?units=metric&appid=b8111915a8b4da98d8db179e59741801&id=";

/* Productor horario */
var producerHourly = new kafka.Producer(client);

producerHourly.on("ready", function () {
  var interval = setInterval(function () {
    for (var i = 0; i < 5; i++) { //communes.length
      const urlTemp = urlHourly + communes[i].id;
      axios
        .post(urlTemp)
        .then((response) => {
          const resp = JSON.stringify(response.data); //response.data.list
          producerHourly.send(
            [{ topic: "hourly", messages: resp }],
            function (err, data) {}
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, 10000); //10 segundos
});