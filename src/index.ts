import { hdGet } from "./middleman";
import { apiInfo } from "./hdapi";
import {
  MiddlemanGetResponse, 
  RawInfo,
  RawStatus,
  RequestData
} from "./types";

const baseUrl: string = apiInfo.base;

const season: string = apiInfo.seasons.current;
const endpoints = apiInfo.endpoints;
const infoUrl: string = `${baseUrl}${season}${endpoints.info}`
const statusUrl: string = `${baseUrl}${season}${endpoints.status}`

import express from 'express';

const app = express();
const port: number = 13131;

let rawInfoData: MiddlemanGetResponse;
let rawStatusData: MiddlemanGetResponse;

async function grabData() {  
  rawInfoData = await hdGet(infoUrl);
  console.log(`Grabbed first set of info data at ${rawInfoData.timestamp}`);
  rawStatusData = await hdGet(statusUrl);
  console.log(`Grabbed first set of status data at ${rawStatusData.timestamp}`);

  // make middleman request every checkInterval minutes to limit requests to helldivers API
  let checkInterval = 10; // in minutes
  setInterval(async () => {
    rawInfoData = await hdGet(infoUrl);
    console.log(`Grabbed new info data at ${rawInfoData.timestamp}`);
    rawStatusData = await hdGet(statusUrl);
    console.log(`Grabbed new status data at ${rawStatusData.timestamp}`);
  }, checkInterval*60*1000);
}

function server() {  
  // Define a basic endpoints
  app.get('/rawinfo', async (req, res) => {
    // log request with req info and time
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`Request for rawinfo at ${reqData.timestamp} from ${reqData.request.ip}`);
    // Set proper content-type header for JSON
    res.setHeader('Content-Type', 'application/json');
    // Return a JSON object
    res.json(rawInfoData);
  });

  app.get('/rawstatus', async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`Request for rawinfo at ${reqData.timestamp} from ${reqData.request.ip}`);
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

async function start() {
  await grabData();
  server();
}

start();