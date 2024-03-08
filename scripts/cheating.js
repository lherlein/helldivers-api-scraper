const axios = require('axios');
const fs = require('fs');

const baseurl = `https://helldivers-2.fly.dev`;

async function main() {
    // get planets
    const planets = await grabPlanets();
    //console.log(planets);

    // format data I want
    const nameArr = makeArray(planets);

    // output json
    const filepath = `misc/index2name.json`;
    writeJsonToFile(nameArr, filepath);
}

async function grabPlanets() {
    const res = await axios.get(`${baseurl}/api/801/planets`); //static for 801 war id
    const data = res.data;
    return data;
}

function writeJsonToFile(jsonObject, filePath) {
    try {
        // Convert the JSON object to a formatted string with 2 spaces indentation
        const jsonString = JSON.stringify(jsonObject, null, 2);

        // Write the string to the specified file
        fs.writeFileSync(filePath, jsonString);

        console.log(`JSON object successfully written to ${filePath}`);
    } catch (error) {
        console.error(`Error writing JSON object to ${filePath}: ${error.message}`);
    }
}

function makeArray(planets) {
    // make array
    let nameArr = [];
    //console.log(planets.length)
    for (let i=0; i<planets.length; i++) {
        //console.log(planets[i])
        let obj = {
            index: planets[i].index, 
            name: planets[i].name
        };
        nameArr.push(obj);
    };
    return nameArr;
}

main();