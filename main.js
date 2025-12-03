import { run } from "./runner.js";
import { setup } from "./setup/setup.js";

async function main() {
    const {cookie, userId, cases} = await setup()
    run(cases, cookie, userId)
}
main()