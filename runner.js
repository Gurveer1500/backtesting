import { compute } from "./compute.js";

export async function run(cases, cookie, userId) {
    console.log(cases);
    // return
    
    const output = await Promise.all(
        cases.map(([tcPath, expectedPath]) => compute(tcPath, expectedPath, cookie, userId))
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

