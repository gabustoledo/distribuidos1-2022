const kafka = require("kafka-node");
const Daily = require("../models/Daily");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });

/* Consumidor diario */
var consumerDaily1 = new kafka.Consumer(client, [{ topic: "daily1" }]);
consumerDaily1.on("message", async function (message) {
  const data = JSON.parse(message.value);
  const dataDaily = data.list[0];

  var diariojson = {};
  diariojson.commune = data.city.name;
  diariojson.dt = new Date(dataDaily.dt * 1000);
  // diariojson.sunrise = dataDaily.sunrise;
  // diariojson.sunset = dataDaily.sunset;
  diariojson.temp_day = dataDaily.temp.day;
  // diariojson.temp_night = dataDaily.temp.day;
  // diariojson.temp_even = dataDaily.temp.eve;
  // diariojson.temp_morn = dataDaily.temp.morn;
  // diariojson.temp_min = dataDaily.temp.min;
  // diariojson.temp_max = dataDaily.temp.max;
  // diariojson.humidity = dataDaily.humidity;
  // diariojson.weather = dataDaily.weather[0].main;
  // diariojson.clouds = dataDaily.clouds;
  // diariojson.wind_speed = dataDaily.speed;
  // diariojson.wind_deg = dataDaily.deg;
  // diariojson.rain = dataDaily.rain;
  // diariojson.snow = dataDaily.snow;
  // diariojson.pop = dataDaily.pop;

  const newDaily = new Daily(diariojson);

  const createdDaily = await newDaily.save();
});