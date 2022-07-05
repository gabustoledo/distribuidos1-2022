const app = require("./app");
require("./database");

app.listen(app.get("port"), () => {
  console.log("Server listening in port", app.get("port"));
});

require("./topics");
require("./producers/producerDaily");
require("./producers/producerHourly");
require("./consumers/consumerDaily1");
require("./consumers/consumerHouly1");
require("./consumers/consumerDaily2");
require("./consumers/consumerHouly2");
