# Helldivers REST API Scraper

This is a for-fun project with the ultimate goal of a simple web app that scrapes the helldivers REST APIs. In the short term, I'm hoping to have a simple node script that hits the endpoints and parses them.

## Goals/Features

This API provides/will provide certain features and cover different use cases:

- Open Source
- Per Planet info and endpoints [TODO]
- Updates + Orders recognition [TODO]
- Cache data from the Helldivers API to limit load
- Data collection and tracking of campaigns/wars over time [TODO]

## Running the server

Typescript is required to run the server. (BROKEN)

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

1. `/rawinfo` returns the entire info json, raw
2. `/rawstatus` returns the entire status json, raw

Base URL: `localhost:13131`

## Example

```bash
curl localhost:13131/rawinfo
curl localhost:13131/rawstatus
```