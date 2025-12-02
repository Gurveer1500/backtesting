import { readFileSync, writeFileSync } from 'fs';
import { deepCompare } from './compare.js';

const endpoint = "https://x-services-dev.optionsutra.com/api/v1/backtesting/compute"

export async function compute(path, expected_testcase_path) {
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
                "x-user-id": "20a8ea91-f696-4b05-b8d4-1162e30f7231",
                "cookie": "at=zIDJK4fhiAQWQeIbAG0usK5nmLWTWaJhhqcJd3DA1to="
            },
            body: JSON.stringify(tc.payload)
        });

        const respBody = await res.json()
        // console.log(respBody.data);
        
        const err = deepCompare(respBody.data, expected)

        if (err) {
            console.error("FAILED: ", tc.name)
            // console.error("Expected :", expected);
            writeFileSync("expected.json", JSON.stringify(expected, null, 2))
            // console.error("Received :", respBody.data);
            writeFileSync("testcase.json", JSON.stringify(respBody.data, null, 2))
            // console.log(respBody);

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