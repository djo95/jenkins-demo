var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var ConnectDB = require("./Config/ConnectDB");
const userRoutes = require('./Routes/userRoutes')
const carRoutes = require('./Routes/carsRoutes')

app.use(express.json({ limit: "50mb" }));

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
//allow cross domain
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(require("body-parser").json());

app.use("/api/users",userRoutes);
app.use('/api/cars',carRoutes)
ConnectDB().then(() => {
  var httpServer = http.createServer(app);

  httpServer.listen(8080); //port

  console.log("API started on port: 8080");
});
