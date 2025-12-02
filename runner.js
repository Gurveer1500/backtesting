// import { compute } from "./compute";
import { compute } from "./compute.js";
import { getTestCases, getExpected } from "./get_data.js";



async function run() {
    // let result = {
    //     passed: 0,
    //     failed: 0
    // }   

    const cases = getTestCases()
    const expected = getExpected()
    for(let i = 0; i < cases.length; i++){
        cases[i] = [cases[i], expected[i]]
    }

    const output = await Promise.all(
        cases.map(([tcPath, expectedPath]) => compute(tcPath, expectedPath))
    )
    
    const result = output.reduce(
        (acc, r) => ({
            passed: acc.passed+r.passed,
            failed: acc.failed+r.failed
        }),
        {passed: 0, failed: 0}
    )
    console.log(result);
    

    console.log("\n---- TEST SUMMARY ----");
    console.log("Passed:", result.passed);
    console.log("Failed:", result.failed);

    if (result.failed > 0) {
        process.exit(1);
    }
}

run()

