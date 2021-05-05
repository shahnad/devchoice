const express = require('express');
const bodyParser = require("body-parser");
const axios = require('axios');
const path = require('path');
const cors = require("cors");
const { get } = require('http');


const app = express()
const port = 8000
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

/* This service is used to display list of all nominations in the Dashboard under Recent nominations section: */
app.get('/service/nominations', async (req, res) => {
  try {
    res.status(200).send(jsonData);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
})

/* This service is used to display the count of nominations received for a nominee in the Dashboard under Nominations count section: */

app.get('/service/nominationcount', async (req, res) => {
  try {
    res.status(200).send(jsonCount);
  } catch (e) {
    res.status(500).json({ fail: e.message });
  }
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})