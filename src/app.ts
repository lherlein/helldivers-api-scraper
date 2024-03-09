import { hdGet } from "./lib/middleman";
import { apiInfo } from "./lib/misc/hdapi";
import {
  RawInfo,
  RawStatus,
  PlanetStatusWithName,
  ResponseStandard
} from "./types";
import { index2name } from "./lib/misc/index2name";

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
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(appEndpoints, 200); // craft response package
    res.json(resPackage); // return response
  });

  /*
  -------------------------------------------------------------------------------------------------

                                        INFO ENDPOINTS

  -------------------------------------------------------------------------------------------------
  */
  
  app.get(infobase, async (req, res) => {
    const resData = rawInfoData;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.info.warId, async (req, res) => {
    const resData = rawInfoData.warId;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.info.dates, async (req, res) => {
    let resJson = {
      startDate: rawInfoData.startDate,
      endDate: rawInfoData.endDate
    }
    const resData = resJson;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.info.minimumClientVersion, async (req, res) => {
    const resData = rawInfoData.minimumClientVersion;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.info.planetInfos, async (req, res) => {
    const resData = rawInfoData.planetInfos;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.info.homeWorlds, async (req, res) => {
    const resData = rawInfoData.homeWorlds;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  /*
  -------------------------------------------------------------------------------------------------

                                        STATUS ENDPOINTS

  -------------------------------------------------------------------------------------------------
  */

  app.get(statusbase, async (req, res) => {
    const resData = rawStatusData;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.warId, async (req, res) => {
    const resData = rawStatusData.warId;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.time, async (req, res) => {
    const resData = rawStatusData.time;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.impactMultiplier, async (req, res) => {
    const resData = rawStatusData.impactMultiplier;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.planetStatus, async (req, res) => {
    const resData = rawStatusData.planetStatus;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.planetAttacks, async (req, res) => {
    const resData = rawStatusData.planetAttacks;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.campaigns, async (req, res) => {
    const resData = rawStatusData.campaigns;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.communityTargets, async (req, res) => {
    const resData = rawStatusData.communityTargets;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.jointOperations, async (req, res) => {
    const resData = rawStatusData.jointOperations;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.planetEvents, async (req, res) => {
    const resData = rawStatusData.planetEvents;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.planetActiveEffects, async (req, res) => {
    const resData = rawStatusData.planetActiveEffects;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.activeElectionPolicyEffects, async (req, res) => {
    const resData = rawStatusData.activeElectionPolicyEffects;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.status.globalEvents, async (req, res) => {
    const resData = rawStatusData.globalEvents;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  /*
  -------------------------------------------------------------------------------------------------

                                        PLANETS ENDPOINTS

  -------------------------------------------------------------------------------------------------
  */

  app.get(planetsbase, async(req, res) => {
    // craft planet response with name
    let resArr = [];
    for (let i=0; i < rawStatusData.planetStatus.length; i++) {
      let obj = rawStatusData.planetStatus[i] as PlanetStatusWithName;
      let index = obj.index;
      let name = index2name.map[index].name;
      obj.name = name;
      resArr.push(obj);
    };
    const resData = resArr;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });

  app.get(appEndpoints.planet.specplanet, async(req, res) => {
    // craft planet response with names
    const planetName = req.params.planet;
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
          "data": "Planet Not found"
        }
        found = true;
      }
      count++;
    };
    const resData = obj;
    console.log(`${new Date().toString()}: ${req.socket.remoteAddress} made ${req.method} to ${req.originalUrl}`);
    // set headers - standard across endpoints
    res.set({
      'Content-Type': 'application/json'
    });
    let resPackage = craftSuccessfulResponseObj(resData, 200); // craft response package
    res.json(resPackage); // return response
  });
}

function craftSuccessfulResponseObj(data: any, code: number) {
  const resPackage: ResponseStandard = {
    success: true,
    message: "Successful Response",
    status: code,
    data
  };
  return resPackage;
}

async function grabDataOnce() {
  let rawInfo = await hdGet(infoUrl);
  rawInfoData = rawInfo.data as RawInfo;
  console.log(`Grabbed info data at ${rawInfo.timestamp}`);
  let rawStatus = await hdGet(statusUrl);
  rawStatusData = rawStatus.data as RawStatus;
  console.log(`Grabbed status data at ${rawStatus.timestamp}`);
}

async function main() {
  await grabDataOnce();
  server();
  const cacheTime = 10; // in minutes
  setInterval(async () => {
    await grabDataOnce();
    server();
  }, cacheTime*60*1000);
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main();

export { app, appEndpoints };
