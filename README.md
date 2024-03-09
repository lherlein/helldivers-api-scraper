# Helldivers REST API Scraper

This is a for-fun project with the ultimate goal of a simple web app that scrapes the helldivers REST APIs. In the short term, I'm hoping to have a simple node script that hits the endpoints and parses them.

## Goals/Features

This API provides/will provide certain features and cover different use cases:

- Open Source
- Per Planet info and endpoints
- Updates + Orders recognition [TODO]
- Cache data from the Helldivers API to limit load
- Data collection and tracking of campaigns/wars over time [TODO]
  - Custom node exporter that exposes war metrics
  - prometheus scraping of the exporter
  - custom grafana dashboards showing war status + change over time
  - time series DB of all metrics

## Roadmap

- Endpoint testing using Jest []
- github actions to test new pushes []
- host API on AWS []
- move to open source []
- openapi/swagger docs []
- node exporter for prometheus to scrape war metrics []
- storage of data in TSDB []

## Running the server locally

Typescript is required to run the server.

To run the server, you must first build the code:

```
tsc
```

Then, run the built code:
```
node dist/index.js
```

Or, to capture logs in a file: 

```
node dist/index.js > serverlogs.txt
```

## Endpoints

1. `/info` returns the entire info json, raw
   1. warId: `/warId`
   2. dates: `/dates`
   3. minClientVersion: `/minimumClientVersion`
   4. planetInfo: `/planetInfos`
   5. homeWorlds: `/homeWorlds`
2. `/status` returns the entire status json, raw
   1. warId: `/status/warId`
   1. time: `/status/time`
   2. impactMultiplier: `/status/impactMultiplier`
   3. planetStatus: `/status/planetStatus`
   4. planetAttacks: `/status/planetAttacks`
   5. campaigns: `/status/campaigns`
   6. communityTargets: `/status/communityTargets`
   7. jointOperations: `/status/jointOperations`
   8. planetEvents: `/status/planetEvents`
   9. planetActiveEffects: `${statusbase}/planetActiveEffects`
   10. activeElectionPolicyEffects: `/status/activeElectionPolicyEffects`
   11. globalEvents: `/status/globalEvents`
3. `/planets` returns all of the planets with their names
   1. individual planets: `/planets/:{planet}`

Base URL: `localhost:13131`

## Example

```bash
curl localhost:13131/info
curl localhost:13131/status
```

https://helldivers-2.fly.dev/api/swaggerui#/default/Helldivers2Web.Api.WarSeasonController.index

## Mapping Index -> Name

In order to allow humans to use and understand the API, the planet names must be included in the API (not just the index, as it is raw). In order to do this, the planets must be plotted with their ID and sector ID and then manually mapped to the planet name from the in-game map (see `/scripts/plotRadial.js` and `rect_coordinates_plot_with_labels.png`). However, this is tedious and requires more effort than it's worth. So I am cheating and using a [prebuilt API](https://github.com/dealloc/helldivers2-api) from @dealloc on github. This API already did this work, and includes index and planet name in the data package. So I will be using that to generate a json object with planet index mapped to planet name.

Find that script in `scripts/cheating.js`