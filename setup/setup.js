
import { getAssertions } from "./assertions.js"
import { login } from "./login.js"

export async function setup() {
    const { cookie, userId } = await login()
    const cases = getAssertions()

    return {
        cookie: cookie,
        userId: userId,
        cases: cases
    }


}