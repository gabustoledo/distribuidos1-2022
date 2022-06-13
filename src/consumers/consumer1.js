const axios = require("axios");
const kafka = require("kafka-node");
const Daily = require("../models/Daily");
const Hourly = require("../models/Hourly");
var communes = require('../../communes.json');

const urlDaily =
  "https://pro.openweathermap.org/data/2.5/forecast/daily?units=metric&appid=b8111915a8b4da98d8db179e59741801&id=";
const urlHourly =
  "https://pro.openweathermap.org/data/2.5/forecast/hourly?units=metric&appid=b8111915a8b4da98d8db179e59741801&id=";

const sendGetDaily = async (url) => {
  try {
		for(var i = 0; i<communes.length ; i++){
			const urlTemp = url + communes[i].id
			const resp = await axios.get(urlTemp);
			const diario = resp.data.list[0];
			var diariojson = {};
			diariojson.commune = resp.data.city.name;
			diariojson.sunrise = diario.sunrise;
			diariojson.sunset = diario.sunset;
			diariojson.temp_day = diario.temp.day;
			diariojson.temp_night = diario.temp.day;
			diariojson.temp_even = diario.temp.eve;
			diariojson.temp_morn = diario.temp.morn;
			diariojson.temp_min = diario.temp.min;
			diariojson.temp_max = diario.temp.max;
			diariojson.humidity = diario.humidity;
			diariojson.weather = diario.weather[0].main;
			diariojson.clouds = diario.clouds;
			diariojson.wind_speed = diario.speed;
			diariojson.wind_deg = diario.deg;
			diariojson.rain = diario.rain;
			diariojson.snow = diario.snow;
			diariojson.pop = diario.pop;

			const newDaily = new Daily(diariojson);
			const createdDaily = await newDaily.save();
		}
		console.log('finalizado')
  } catch (err) {
    console.error(err);
  }
};

// sendGetDaily(urlDaily);

const sendGetHourly = async (url) => {
  try {
		for(var k = 0; k<10 ; k++){ // communes.length
			const urlTemp = url + communes[k].id
			const resp = await axios.get(urlTemp);
			for (var i = 0; i < 24; i++) {
				const hour = resp.data.list[i];
				var hourjson = {};
				hourjson.commune = resp.data.city.name;
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
		}
		console.log('finalizado')
  } catch (err) {
    console.error(err);
  }
};

// sendGetHourly(urlHourly);


const client = new kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'})

/* Consumidor */
var consumer = new kafka.Consumer(client, [ { topic: 'test' } ])
consumer.on('message', function (message) {
	const data = JSON.parse(message.value)
	console.log(message)
	console.log(message.value)
	console.log(data)
})
