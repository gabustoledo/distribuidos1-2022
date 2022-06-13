const { Schema, model } = require("mongoose");

const hourlySchema = new Schema(
  {
    commune: { type: String, required: true }, // Nombre de la comuna
    hour: { type: Number, required: true }, // Timestamps, hay que pasarlo a UTC
    temp: { type: Number, required: true }, // Temperatura de esa hora en Celcius
    humidity: { type: Number, required: true }, // Porcentaje de humedad 0-100
    weather: { type: String, required: true }, // Rain, Snow, Extreme, etc
    clouds: { type: Number, required: true, default: 0 }, // Porcentaje de nuves 0-100
    wind_speed: { type: Number, required: true }, // Velocidad del viento en m/s
    wind_deg: { type: Number, required: true }, // Angulo del viento en degress
    visibility: { type: Number, required: true }, // visibilidad en metros, max 10000
    pop: { type: Number, required: true, default: 0 }, // Probabilidad de precipitacion 0-1
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

module.exports = model("Hourly", hourlySchema);
