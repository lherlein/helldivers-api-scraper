const fetch = require("node-fetch");

async function get(url) {
    // request options
    const options = {
        method: "GET",
    };
    
    //console.log(`attempting to fetch at ${url}`);
    try {
        // fetch data
        let res = await fetch(url, options);
        let data = await res.json();
        
        // craft response object
        let obj = {
            "timestamp": new Date().toISOString(),
            "status": res.status,
            "data": data
        };
        
        
        return obj;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

module.exports = { get };