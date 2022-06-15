const app = require("./app");
require("./database");

app.listen(app.get("port"), () => {
  console.log("Server listening in port", app.get("port"));
});

require("./topics");
require("./producers/producerDaily");
require("./producers/producerHourly");
require("./consumers/consumerDaily");
require("./consumers/consumerHouly");
