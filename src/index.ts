import { hdGet } from "./middleman";
import { apiInfo } from "./hdapi";
import {
  MiddlemanGetResponse, 
  RawInfo,
  RawStatus,
  RequestData,
  PlanetStatusWithName
} from "./types";
import { index2name } from "./index2name";

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
let planetsbase = `/planets`

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
    planetStatus: `${statusbase}/planetStatus`,
    planetAttacks: `${statusbase}/planetAttacks`,
    campaigns: `${statusbase}/campaigns`,
    communityTargets: `${statusbase}/communityTargets`,
    jointOperations: `${statusbase}/jointOperations`,
    planetEvents: `${statusbase}/planetEvents`,
    planetActiveEffects: `${statusbase}/planetActiveEffects`,
    activeElectionPolicyEffects: `${statusbase}/activeElectionPolicyEffects`,
    globalEvents: `${statusbase}/globalEvents`
  },
  planet: {
    specplanet: `${planetsbase}/:planet`
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

  /*
  -------------------------------------------------------------------------------------------------

                                        INFO ENDPOINTS

  -------------------------------------------------------------------------------------------------
  */
  
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

  /*
  -------------------------------------------------------------------------------------------------

                                        STATUS ENDPOINTS

  -------------------------------------------------------------------------------------------------
  */

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

  app.get(appEndpoints.status.warId, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.warId);
  });

  app.get(appEndpoints.status.time, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.time);
  });

  app.get(appEndpoints.status.impactMultiplier, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.impactMultiplier);
  });

  app.get(appEndpoints.status.planetStatus, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.planetStatus);
  });

  app.get(appEndpoints.status.planetAttacks, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.planetAttacks);
  });

  app.get(appEndpoints.status.campaigns, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.campaigns);
  });

  app.get(appEndpoints.status.communityTargets, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.communityTargets);
  });

  app.get(appEndpoints.status.jointOperations, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.jointOperations);
  });

  app.get(appEndpoints.status.planetEvents, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.planetEvents);
  });

  app.get(appEndpoints.status.planetActiveEffects, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.planetActiveEffects);
  });

  app.get(appEndpoints.status.activeElectionPolicyEffects, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.activeElectionPolicyEffects);
  });

  app.get(appEndpoints.status.globalEvents, async (req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);
    res.json(rawStatusData.globalEvents);
  });

  /*
  -------------------------------------------------------------------------------------------------

                                        PLANETS ENDPOINTS

  -------------------------------------------------------------------------------------------------
  */

  app.get(planetsbase, async(req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);

    // craft planet response with names
    let resArr = [];
    for (let i=0; i < rawStatusData.planetStatus.length; i++) {
      let obj = rawStatusData.planetStatus[i] as PlanetStatusWithName;
      let index = obj.index;
      let name = index2name.map[index].name;
      obj.name = name;
      resArr.push(obj);
    };

    res.json(resArr);
  });

  app.get(appEndpoints.planet.specplanet, async(req, res) => {
    const reqData: RequestData = {
      "timestamp": new Date().toISOString(),
      "request": req
    };
    console.log(`${reqData.timestamp}: ${reqData.request.ip} requested ${reqData.request.originalUrl}`);

    const planetName = req.params.planet;

    // craft planet response with names
    let found = false;
    let obj;
    let count = 0;
    while (!found) {  
      let name = index2name.map[count].name;
      if (planetName == name) {
        obj = rawStatusData.planetStatus[count] as PlanetStatusWithName;
        obj.name = name;
        found = true;
      } else if (count == rawStatusData.planetStatus.length && planetName != name) {
        obj = {
          "status": 404,
          "data": "Planet Not found"
        }
        found = true;
      }
      count++;
    };
    res.json(obj);
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