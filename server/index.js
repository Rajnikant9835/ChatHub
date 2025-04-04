const express = require("express");
// const cors = require("cors");
require('dotenv').config();
const {app , server} = require('./socket/index');
const router = require("./routes/index");

const connectDB = require("./config/connectDB");
const cookieParser = require("cookie-parser");

// const app = express();

const cors = require('cors');
// app.use(cors({ origin: 'http://localhost:3000'}));
// / CORS configuration with credentials support
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',   // Allow requests from this origin
  credentials: true                  // Allow sending cookies and authorization headers
}));

// app.use(cors({
//   origin: process.env.FRONTED_URL,
//   credentials: true,
// })
// );

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.get("/", (request, response) => {
  response.json({
    message: "Server running at PORT " + PORT,
  });
});



//api endpointes
app.use("/api", router);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("Server is running at PORT " + PORT);
  });
});


