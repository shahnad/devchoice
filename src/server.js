const moment = require('moment');
const express = require('express');
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const linkTokenSchema = require('./server/models/linktoken');
const nominationSchema = require('./server/models/nominations');
const axios = require('axios');
const path = require('path');
const cors = require("cors");
const { get } = require('http');


let currentDate = moment().format('YYYY-MM-DD hh:mm');


const app = express()
const port = 8000

const DB_NAME = 'devchoice';
const DB_PORT = 3306;
const DB_USERNAME = 'admin';
const DB_PASSWORD = 'C@rnagieMe11on';
const DB_HOST = '127.0.0.1';
const DB_DIALECT = 'mysql';
const DB_POOL = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};


const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  pool: DB_POOL,
  port: DB_PORT
});

const LinkTokenModel = linkTokenSchema(sequelize, DataTypes);
const NominationModel = nominationSchema(sequelize, DataTypes);

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const jsonData = 
     [
        {   
            "id": 1,
            "nominee": "John Brass",
            "nomineeEmail": "john.brass@test.com",
            "description": "Brilaint coding help done during sprint. Faster issue fixing.",
            "nominatedby": "Vinod Mathew",

        },
        {
            "id": 2,
            "nominee": "Mat Dameon",
            "nomineeEmail": "mat.dam@test.com",
            "description": "Excellent coordination by Matt. Quick help.",
            "nominatedby": "Sam Black",

        },
        {
            "id": 3,
            "nominee": "Sunny Donn",
            "nomineeEmail": "sunny.donn@test.com",
            "description": "Excellent coordination by Sunny. Fun and good development skills.",
            "nominatedby": "Roger Fred",

        }
    ]


    const jsonCount = 
    [
       {   
           "id": 1,
           "nominee": "John Brass",
           "count":7
       },
       {
           "id": 2,
           "nominee": "Mat Dameon",
           "count":3
       },
       {
           "id": 3,
           "nominee": "Sunny Donn",
           "count":5

       }
   ]

/* This service is used to submit a nomination */
app.put('/service/nominateperson', async (req, res) => {
  try {
    const nomineeName = req.body.nomineename;
    const nomineeEmail = req.body.nomineeemail; 
    const description = req.body.description; 
    const nominatedBy = req.body.nominatedby; 
    var data = {nomineename:nomineeName, email:nomineeEmail, description:description, nominatedby:nominatedBy};
    const nominationData = await NominationModel.create(data);
    res.status(200).send(nominationData);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});


/* This service is used to display list of all nominations in the Dashboard under Recent nominations section: */
app.get('/service/nominations', async (req, res) => {
  try {
    res.status(200).send(jsonData);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to display the count of nominations received for a nominee in the Dashboard under Nominations count section: */

app.get('/service/nominationcount', async (req, res) => {
  try {
    res.status(200).send(jsonCount);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to create a token data while creating a link */
app.post('/service/createlink', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const tokenData = req.body.token;
    const data = userEmail+tokenData;
    let buff = new Buffer(data);
    let base64data = buff.toString('base64');
    let validUptoDate = moment().add(30,'minutes') //replace 2 with number of days you want to add .toDate() and convert it to a Javascript Date Object if you like
    const linkTokenData = await LinkTokenModel.create({...req.body, email:userEmail, token:base64data, createdAt:currentDate, expiredAt:validUptoDate});  
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});


//const tokenEmailRecord = await LinkTokenModel.count({ where: { email: userEmail } });

/* This service is used to validate the created link and display the page for nomination */
app.post('/service/validatelink', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const data = await LinkTokenModel.findAll({ attributes: ['token','expiredAt']}, {where: { email: userEmail }});
    const expiryDate = data[0].expiredAt;
    const formattedExpiryDate = moment(expiryDate).format('YYYY-MM-DD hh:mm');
    const tokenData = data[0].token;
    console.log("Get expiry date from table: "+formattedExpiryDate);
    console.log("Get current date: "+currentDate);
    var now = moment(); 
    var currentDate = moment(now).format('YYYY-MM-DD hh:mm');
    if(currentDate < formattedExpiryDate ){
      let tokendata = tokenData;
      res.status(200).send(tokendata);
    } else {
      res.status(404).json({ message: "Nomination link expired, please create a new one..!" });
    }
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});



(async () => {
  try {
    const sequelizeStatus = await sequelize.sync();
    console.log("your server is up and running");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  } catch (e) {
    console.log(e, 'Database issue.');
  }
})();