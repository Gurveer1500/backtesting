import { getExpected, getTestCases } from "../get_data.js"

export function getAssertions() {
    const cases = getTestCases()
    const expected = getExpected()
    for (let i = 0; i < cases.length; i++) {
        cases[i] = [cases[i], expected[i]]
    }
    return cases
}