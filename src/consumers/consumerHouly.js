const kafka = require("kafka-node");
const Hourly = require("../models/Hourly");

const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'})

/* Consumidor hora */
var consumerHourly = new kafka.Consumer(client, [ { topic: 'hourly' } ])
consumerHourly.on('message', async function (message) {
	const data = JSON.parse(message.value)
	const name = data.city.name
	const dataHourly = data.list

	for (var i = 0; i < 24; i++) {
		const hour = dataHourly[i];
		var hourjson = {};
		hourjson.commune = name;
		hourjson.hour = hour.dt;
		hourjson.temp = hour.main.temp;
		hourjson.humidity = hour.main.humidity;
		hourjson.weather = hour.weather[0].main;
		hourjson.clouds = hour.clouds.all;
		hourjson.wind_speed = hour.wind.speed;
		hourjson.wind_deg = hour.wind.deg;
		hourjson.visibility = hour.visibility;
		hourjson.pop = hour.pop;

		const newHourly = new Hourly(hourjson);
		const createdHourly = await newHourly.save();
	}
})