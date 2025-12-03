import {readdirSync} from "fs"

export function getTestCases(){
    const cases = new Array()

    const files = readdirSync("test/testcase")
    files.forEach((file) => {
        cases.push("test/testcase/"+file)
    })
    
    return cases
}
export function getExpected(){
    const cases = new Array()

    const files = readdirSync("test/expected")
    files.forEach((file) => {
        cases.push("test/expected/"+file)
    })
    
    return cases
}