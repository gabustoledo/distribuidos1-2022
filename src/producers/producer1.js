const axios = require("axios");
const kafka = require("kafka-node");
var communes = require("../../communes.json");
const client = new kafka.KafkaClient({ kafkaHost: "127.0.0.1:9092" });

const urlDaily =
  "https://pro.openweathermap.org/data/2.5/forecast/daily?units=metric&appid=b8111915a8b4da98d8db179e59741801&id=";
const urlHourly =
  "https://pro.openweathermap.org/data/2.5/forecast/hourly?units=metric&appid=b8111915a8b4da98d8db179e59741801&id=";

const sendGetDaily = async (url) => {
  try {
    for (var i = 0; i < communes.length; i++) {
      const urlTemp = url + communes[i].id;
      const resp = await axios.get(urlTemp);
      const diario = resp.data.list[0];
    }
    console.log(
      "Finalizado el get de las ",
      str(communes.length),
      " comunas.\n"
    );
  } catch (err) {
    console.error(err);
  }
};

// sendGetDaily(urlDaily);

const sendGetHourly = async (url) => {
  try {
    for (var k = 0; k < 10; k++) {// communes.length
      const urlTemp = url + communes[k].id;
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
    console.log("finalizado");
  } catch (err) {
    console.error(err);
  }
};

// sendGetHourly(urlHourly);

/* Productor Diario */
var producerDaily = new kafka.Producer(client);

producerDaily.on("ready", function () {
  var interval = setInterval(function () {
    for (var i = 0; i < 1; i++) { //communes.length
      const urlTemp = urlDaily + communes[i].id;
      axios
        .post(urlTemp)
        .then((response) => {
          const resp = JSON.stringify(response.data.list[0]);
          producerDaily.send(
            [{ topic: "test", messages: resp }],
            function (err, data) {}
          );
        })
        .catch((error) => {
          console.log(error);
        });
      // producerDaily.send( [ { topic: "test", messages: urlTemp } ], function(err, data) {})
    }
  }, 10000); //10 segundos
});
