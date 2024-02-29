# Helldivers REST API Scraper

This is a for-fun project with the ultimate goal of a simple web app that scrapes the helldivers REST APIs. In the short term, I'm hoping to have a simple node script that hits the endpoints and parses them.

## Running the server

Webpack build does not work as of now.

To run the server, do:

```
node src/index.js
```

Or, to capture logs:

```
node src/index.js > serverlogs.txt
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