const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;
require("dotenv/config");

// Init Express
const app = express();

// Fix moongoose deprecation warning
mongoose.set('useCreateIndex', true);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow cross orign request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Endpoint routes handlers:
app.use("/login", require("./api/login"));
app.use("/token", require("./api/token"));
app.use("/logout", require("./api/logout"));
app.use("/user", require("./api/user"));

// Connect to Mongo db
mongoose.connect(
  process.env.DB_REWAER_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db!")
);

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
