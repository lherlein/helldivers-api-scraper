const middleman = require("./middleman");
const apiInfo = require("./api.json");
const baseUrl = apiInfo.base;

const season = apiInfo.seasons.current;
const endpoints = apiInfo.endpoints;
const infoUrl = `${baseUrl}${season}${endpoints.info}`
const statusUrl = `${baseUrl}${season}${endpoints.status}`

const express = require('express');
const app = express();
const port = 13131;

let rawInfoData;
let rawStatusData;

async function grabData() {  
  rawInfoData = await middleman.get(infoUrl);
  console.log(`Grabbed first set of info data at ${rawInfoData.timestamp}`);
  rawStatusData = await middleman.get(statusUrl);
  console.log(`Grabbed first set of status data at ${rawStatusData.timestamp}`);

  // make middleman request every checkInterval minutes to limit requests to helldivers API
  let checkInterval = 0.2; // in minutes
  setInterval(async () => {
    rawInfoData = await middleman.get(infoUrl);
    console.log(`Grabbed new info data at ${rawInfoData.timestamp}`);
    rawStatusData = await middleman.get(statusUrl);
    console.log(`Grabbed new status data at ${rawStatusData.timestamp}`);
  }, checkInterval*60*1000);
}

function server() {  
  // Define a basic endpoints
  app.get('/rawinfo', async (req, res) => {
    // Set proper content-type header for JSON
    res.setHeader('Content-Type', 'application/json');
    // Return a JSON object
    res.json(rawInfoData);
  });

  app.get('/rawstatus', async (req, res) => {
    // Set proper content-type header for JSON
    res.setHeader('Content-Type', 'application/json');
    // Return a JSON object
    res.json(rawStatusData);
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

grabData();
server();