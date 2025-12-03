import { compute } from "./compute.js";

export async function run(cases, cookie, userId) {
    const wrappedPromises = cases.map(async ([tcPath, expectedPath]) => {
        try {
            const res = await compute(tcPath, expectedPath, cookie, userId);
            if (res && typeof res.failed === "number" && res.failed > 0) {
                const err = new Error(`Test failed for ${tcPath}: ${res.failed} failures`);
                err.result = res;
                err.tcPath = tcPath;
                throw err;
            }
            return res;
        } catch (e) {
            throw e;
        }
    });

    try {
        const output = await Promise.all(wrappedPromises);

        const result = output.reduce(
            (acc, r) => ({
                passed: acc.passed + (r?.passed || 0),
                failed: acc.failed + (r?.failed || 0)
            }),
            { passed: 0, failed: 0 }
        );

        console.log("\n---- TEST SUMMARY ----");
        console.log("Passed:", result.passed);
        console.log("Failed:", result.failed);

        if (result.failed > 0) {
            process.exit(1);
        }
    } catch (error) {
        console.error("\nA test case failed. Aborting remaining tests.");
        if (error?.tcPath) {
            console.error(`Failed Case: ${error.tcPath}`);
        }
        if (error?.result) {
            const r = error.result;
            console.error(`Partial Result => Passed: ${r.passed ?? 0}, Failed: ${r.failed ?? 0}`);
        }
        process.exit(1);
    }
}
