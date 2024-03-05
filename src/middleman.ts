import axios, { AxiosResponse } from "axios";
import { MiddlemanGetResponse, RawInfo, RawStatus } from "./types";

export async function hdGet(url: string): Promise<MiddlemanGetResponse> {
    //console.log(`attempting to fetch at ${url}`);
    try {
        // fetch data
        let res: AxiosResponse = await axios.get(url);
        //console.log(res.data);
        
        // craft response object
        let obj: MiddlemanGetResponse = {
            "timestamp": new Date().toISOString(),
            "status": res.status as number,
            "data": res.data as RawInfo | RawStatus
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

