const kafka = require("kafka-node");
const Hourly = require("../models/Hourly");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

/* Consumidor hora */
var consumerHourly2 = new kafka.Consumer(client, [{ topic: "hourly2" }]);

consumerHourly2.on("message", async function (message) {
  const data = JSON.parse(message.value);
  const name = data.city.name;
  const dataHourly = data.list;

  // for (var i = 0; i < 24; i++) {
    var hour = dataHourly[23];
    var hourjson = {};
    hourjson.commune = name;
    hourjson.hour = new Date(hour.dt * 1000);
    hourjson.temp = hour.main.temp;
    // hourjson.humidity = hour.main.humidity;
    // hourjson.weather = hour.weather[0].main;
    // hourjson.clouds = hour.clouds.all;
    // hourjson.wind_speed = hour.wind.speed;
    // hourjson.wind_deg = hour.wind.deg;
    // hourjson.visibility = hour.visibility;
    // hourjson.pop = hour.pop;

    const newHourly = new Hourly(hourjson);
    const createdHourly = await newHourly.save();
  // }
});