const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./src/routers/routes');

app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log("Port is listening.");
});
