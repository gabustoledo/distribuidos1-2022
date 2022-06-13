const { Schema, model } = require("mongoose");

const dailySchema = new Schema(
  {
    commune: { type: String, required: true }, // Nombre de la comuna
    sunrise: { type: Number, required: true }, // Hora del amanecer en timestamps
    sunset: { type: Number, required: true }, // Hora del atardecer en timestamps
    temp_day: { type: Number, required: true }, // Temperatura en el dia en Celcius
    temp_night: { type: Number, required: true }, // Temperatura en la noche en Celcius
    temp_even: { type: Number, required: true }, // Temperatura en la tarde en Celcius
    temp_morn: { type: Number, required: true }, // Temperatura en la manana en Celcius
    temp_min: { type: Number, required: true }, // Temperatura minima en Celcius
    temp_max: { type: Number, required: true }, // Temperatura maxima  en Celcius
    humidity: { type: Number, required: true }, // Porcentaje de humedad 0-100
    weather: { type: String, required: true }, // Rain, Snow, Extreme, etc
    clouds: { type: Number, required: true, default: 0 }, // Porcentaje de nuves 0-100
    wind_speed: { type: Number, required: true }, // Velocidad del viento en m/s
    wind_deg: { type: Number, required: true }, // Angulo del viento en degress
    rain: { type: Number, required: true, default: 0 }, // volumen de lluvia en mm
    snow: { type: Number, required: true, default: 0 }, // volumen de nieve
    pop: { type: Number, required: true, default: 0 }, // Probabilidad de precipitacion 0-1
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("Daily", dailySchema);
