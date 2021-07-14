const moment = require('moment');
const express = require('express');
const bodyParser = require("body-parser");
require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize");
const linkTokenSchema = require('./server/models/linktoken');
const nominationSchema = require('./server/models/nominations');
const nominationWinnerSchema = require('./server/models/nominationwinner');
const axios = require('axios');
const path = require('path');
const cors = require("cors");
const { get } = require('http');
const mattermost_token = process.env.REACT_APP_MATTERMOST_TOKEN;
const channel_Id = process.env.REACT_APP_MATTERMOST_CHANNEL_ID;


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
const NominationWinnerModel = nominationWinnerSchema(sequelize, DataTypes);


app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* This service is used to submit a nomination and will display invalid link if token expired */
app.post('/service/nominateperson', async (req, res) => {
  try {
    const nomineeName = req.body.nomineename;
    const nomineeEmail = req.body.email;
    const nomineeTeam = req.body.nomineeteam;
    const description = req.body.description;
    const nominatedBy = req.body.nominatedby;
    var data = { nomineename: nomineeName, email: nomineeEmail, nomineeteam: nomineeTeam, description: description, nominatedby: nominatedBy };
    console.log("Server side display nominations :" + data);
    const checkTokenData = await LinkTokenModel.findAll({ attributes: ['token', 'expiredAt'] });
    const expiryDate = checkTokenData[0].expiredAt;
    const formattedExpiryDate = moment(expiryDate).format('YYYY-MM-DD hh:mm');
    const tokenData = checkTokenData[0].token;
    var now = moment();
    var currentDate = moment(now).format('YYYY-MM-DD hh:mm');
    if (currentDate < formattedExpiryDate) {
      const nominationData = await NominationModel.create(data);
      res.status(200).json({ message: "Nomination send successfully !" });
    } else {
      res.status(404).json({ fail: true });
    }
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});


/* This service is used to display list of all nominations in the Dashboard under Recent nominations section: */
app.get('/service/nominations', async (req, res) => {
  try {
    const nominationData = await NominationModel.findAll({ attributes: ['email', 'nomineename', 'nomineeteam', 'description', 'nominatedby', 'createdAt'] });
    res.status(200).send(nominationData);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});


/* This service is used to display the count of nominations received for a nominee in the Dashboard under Nominations count section: */
app.get('/service/nominationcount', async (req, res) => {
  try {
    const data = await NominationModel.findAll({
      group: ['email'],
      attributes: ['email', 'nomineename', [sequelize.fn('COUNT', 'email'), 'EmailCount']],
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});


/* This service is used to display the teamwise names of the nominees : */
app.get('/service/teamwisenomination', async (req, res) => {
  try {
    const data = await NominationModel.findAll({
      attributes: ['nomineename', 'nomineeteam']
    });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});


/* This service is used to create and update token data while creating a link */
app.put('/service/createlink', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const tokenData = req.body.token;
    const data = userEmail + tokenData;
    let buff = new Buffer(data);
    let base64data = buff.toString('base64');
    let validUptoDate = moment().add(2, 'days') //replace 2 with number of days you want to add .toDate() and convert it to a Javascript Date Object if you like
    const tokenEmailRecord = await LinkTokenModel.count({ where: { email: userEmail } });
    if (tokenEmailRecord == 0) {
      const linkTokenData = await LinkTokenModel.create({ ...req.body, email: userEmail, token: base64data, createdAt: currentDate, expiredAt: validUptoDate });
      res.status(200).json({ message: "Token created successfully !" });
    } else {
      const linkTokenData = await LinkTokenModel.update({ ...req.body, email: userEmail, token: base64data, createdAt: currentDate, expiredAt: validUptoDate }, { where: { email: userEmail } });
      res.status(200).json({ message: "Token updated successfully !" });
    }
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});


/* This service is used to validate the created link and display the page for nomination */
app.post('/service/validatelink', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const data = await LinkTokenModel.findAll({ attributes: ['token', 'expiredAt'] }, { where: { email: userEmail } });
    const expiryDate = data[0].expiredAt;
    const formattedExpiryDate = moment(expiryDate).format('YYYY-MM-DD hh:mm');
    const tokenData = data[0].token;
    console.log("Get expiry date from table: " + formattedExpiryDate);
    var now = moment();
    var currentDate = moment(now).format('YYYY-MM-DD hh:mm');
    console.log("Get current date: " + currentDate);
    if (currentDate < formattedExpiryDate) {
      let tokendata = tokenData;
      res.status(200).send(tokendata);
    } else {
      res.status(404).json({ message: "Nomination link expired, please create a new one..!" });
    }
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to get the email of the person who created token and dashboard should be available to that login only : */
app.get('/service/dashboardview', async (req, res) => {
  try {
    const userEmail = req.body.email;
    const dashboardData = await LinkTokenModel.findAll({ attributes: ['email', 'token'] }, { where: { email: userEmail } });
    res.status(200).send(dashboardData);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to save the winner data into the nomination winner table : */
app.post('/service/confirmwinner', async (req, res) => {
  try {
    const winnerEmail = req.body.email;
    const winnerName = req.body.name;
    var data = { email: winnerEmail, winner: winnerName };
    const winnerData = await NominationWinnerModel.create(data);
    res.status(200).send(winnerData);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to get the latest winner data from the nomination winner table : */
app.get('/service/displaywinner', async (req, res) => {
  try {
    const winnerEmail = req.body.email;
    const data = await NominationWinnerModel.findAll({ attributes: ['winner', 'createdAt'] }, { where: { email: winnerEmail } });
    res.status(200).send(data);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to group nomination based on name: */
app.get('/service/nominationgroup', async (req, res) => {
  try {
    const nominationGroup = await NominationModel.findAll({
      //group: ['nomineename'],
      attributes: ['nomineename', 'nomineeteam', 'description', 'createdAt']
    });
    res.status(200).send(nominationGroup);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
});

/* This service is used to publish a winner to the mattermost site: */
app.post('/service/publishwinner', async (req, res) => {
  try {
    const winnerName = req.body.winnerName;
    const winnerDetails = req.body.winnerDetails;
    const mattermosttoken = mattermost_token;
    const res = await axios.post('https://vinod.cloud.mattermost.com/api/v4/posts', {
      "channel_id": channel_Id,
      "message": `Congratulations...! ${winnerName} ${winnerDetails} ...!
      ![image](https://i.picsum.photos/id/452/4096/2722.jpg?hmac=VFr5l8FshPX1LW4DCpHm99QQgWMsHW5Lr70-6ZQZuFg)`,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mattermosttoken}`,
      },
    });
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