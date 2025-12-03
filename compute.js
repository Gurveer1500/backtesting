import { readFileSync, } from 'fs';
import { deepCompare } from './compare.js';
import { configDotenv } from 'dotenv';


export async function compute(path, expected_testcase_path, cookie, userId) {
    configDotenv()
    const baseUrl = process.env.BASE_URL
    const endpoint = baseUrl+"/backtesting/compute"
    let result = {
        passed: 0,
        failed: 0
    }

    const tc = JSON.parse(readFileSync(path, "utf-8"));
    const expected = JSON.parse(readFileSync(expected_testcase_path, "utf-8"))
    let passed = 0
    let failed = 0

    
    console.log("Running test case:", tc.name);
    try {
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-user-id": ""+userId,
                "cookie": ""+cookie
            },
            body: JSON.stringify(tc.payload)
        });

        const respBody = await res.json()
        // console.log(respBody);

        let err

        if (!respBody.data) {
            err = deepCompare(respBody, expected)
        } else {
            err = deepCompare(respBody.data, expected) 
        }


        if (err) {
            console.error("FAILED: ", tc.name)
            console.log(err);
            failed++; 
        }
        // console.error("Expected :", expected);
        // console.error("Received :", respBody.data);
        if (failed <= 0) {
            passed = 1
        }
    } catch (err) {
        console.error(err);
        failed++;
        
    }
    
    result.passed += passed
    result.failed += failed
    return result
}