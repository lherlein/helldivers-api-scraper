import fetch, { Response } from "node-fetch";
import { MiddlemanGetResponse, RawInfo, RawStatus } from "./types";

export async function hdGet(url: string): Promise<MiddlemanGetResponse> {
    // request options
    const options = {
        method: "GET",
    };
    
    //console.log(`attempting to fetch at ${url}`);
    try {
        // fetch data
        let res: Response = await fetch(url, options);
        let data = await res.json() as RawInfo | RawStatus;
        
        // craft response object
        let obj: MiddlemanGetResponse = {
            "timestamp": new Date().toISOString(),
            "status": res.status,
            "data": data
        };
        
        
        return obj;
    } catch (error) {
        console.error(`Error: ${error}`);
        return {
            "timestamp": new Date().toISOString(),
            "status": 500,
            "data": null
        };
    }
}

