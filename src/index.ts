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

let rawInfoData: RawInfo;
let rawStatusData: RawStatus;

let infobase = '/info';
let statusbase = '/status';

const appEndpoints = {
  info: {
    warId: `${infobase}/warId`,
    dates: `${infobase}/dates`,
    minimumClientVersion: `${infobase}/minimumClientVersion`,
    planetInfos: `${infobase}/planetInfos`,
    homeWorlds: `${infobase}/homeWorlds`
  },
  status: {
    warId: `${statusbase}/warId`,
    time: `${statusbase}/time`,
    impactMultiplier: `${statusbase}/impactMultiplier`,
    storyBeatId32: `${statusbase}/storyBeatId32`,
    planetStatus: `${statusbase}/planetStatus`,
    planetAttacks: `${statusbase}/planetAttacks`,
    campaigns: `${statusbase}/campaigns`,
    communityTargets: `${statusbase}/communityTargets`,
    jointOperations: `${statusbase}/jointOperations`,
    planetEvents: `${statusbase}/planetEvents`,
    planetActiveEffects: `${statusbase}/planetActiveEffects`,
    activeElectionPolicyEffects: `${statusbase}/activeElectionPolicyEffects`,
    globalEvents: `${statusbase}/globalEvents`,
    superEarthWarResults: `${statusbase}/superEarthWarResults`
  }
};

function server() {  
  // Define a basic endpoints
  app.get('/', async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
  });
  
  app.get(infobase, async (req, res) => {
    // log request with req info and time
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    // Set proper content-type header for JSON
    res.setHeader('Content-Type', 'application/json');
    // Return a JSON object
    res.json(rawInfoData);
  });

  app.get(statusbase, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    // Set proper content-type header for JSON
    res.setHeader('Content-Type', 'application/json');
    // Return a JSON object
    res.json(rawStatusData);
  });

  app.get(appEndpoints.info.warId, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawInfoData.warId);
  });

  app.get(appEndpoints.info.dates, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    
    let resJson = {
      startDate: rawInfoData.startDate,
      endDate: rawInfoData.endDate
    }

    res.json(resJson);
  });

  app.get(appEndpoints.info.minimumClientVersion, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawInfoData.minimumClientVersion);
  });

  app.get(appEndpoints.info.planetInfos, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawInfoData.planetInfos);
  });

  app.get(appEndpoints.info.homeWorlds, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawInfoData.homeWorlds);
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

async function grabData() {  
  let rawInfo = await hdGet(infoUrl);
  rawInfoData = rawInfo.data as RawInfo;
  console.log(`Grabbed first set of info data at ${rawInfo.timestamp}`);
  let rawStatus = await hdGet(statusUrl);
  rawStatusData = rawStatus.data as RawStatus;
  console.log(`Grabbed first set of status data at ${rawStatus.timestamp}`);

  // make middleman request every checkInterval minutes to limit requests to helldivers API
  let checkInterval = 10; // in minutes
  setInterval(async () => {
    let rawInfo = await hdGet(infoUrl);
    rawInfoData = rawInfo.data as RawInfo;
    console.log(`Grabbed new info data at ${rawInfo.timestamp}`);
    let rawStatus = await hdGet(statusUrl);
    rawStatusData = rawStatus.data as RawStatus;
    console.log(`Grabbed new status data at ${rawStatus.timestamp}`);
  }, checkInterval*60*1000);
}

async function start() {
  await grabData();
  server();
}

start();