require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const clockRoutes = require('./routes/ClockRoutes');

const connectDb = require("./Utils/db");
const app = express();



// tackling cors here only !

const corsOptions = {
    origin: "http://localhost:5173",
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials:true,
};

app.use(cors(corsOptions));

app.use(express.json({limit:"100mb"}));
app.use(bodyParser.json());


// Routes
app.use('/api/clock', clockRoutes);

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV = "production"){
  app.use(express.static("client/dist"));
}


connectDb().then(() => {
app.listen(PORT, () => {
    console.log(`server is running on port no :${PORT}`);
 });
});
