export function deepCompare(actual, expected) {
    if(typeof actual !== typeof expected) {
        return `Type mismatch: expected ${typeof expected}, got ${typeof actual}`
    }

    if (typeof expected !== "object" || expected === null) {
        if (actual !== expected) {
            return `Value mismatch : expected ${expected}, got ${actual}`
        }
        return null
    }

    if (Array.isArray(expected)){
        if(!Array.isArray(actual)){
            return `Type mismatch : expected array, got non-array`
        }
        if (actual.length !== expected.length) {
            return `Array length mismatch : ${expected.length} expected, got ${actual.length} actual`
        }
        for (let i = 0; i < expected.length; i++){
            const res = deepCompare(actual[i], expected[i])
            if (res !== null){
                return `At array index ${i} : ${res}`
            }
        }
        return null
    }
    
    for (const key of Object.keys(expected)){
        if (key.toLowerCase() === "id" || key.toLowerCase() === "strategy_id") continue
        if (!(key in actual)){
            return `Missing key: ${key}`
        }
        const res = deepCompare(actual[key], expected[key])
        if (res !== null){
            return `At key '${key}': ${res}`
        }
    }
    return null

}
