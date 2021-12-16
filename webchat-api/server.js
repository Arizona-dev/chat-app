require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const authRoute = require('./routes/auth');

const dbURI = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}.upmzx.mongodb.net/${process.env.DBCLUSTER}?retryWrites=true&w=majority`;

mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on("error", (err)=>{console.error(err)});
db.once("open", () => {console.log("DB started successfully")});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);

app.listen(8080, () => console.log('API is running on http://localhost:8080/'));