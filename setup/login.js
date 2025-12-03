import { configDotenv } from "dotenv"

export async function login() {
    configDotenv({quiet: true})
    const baseUrl = process.env.BASE_URL
    const userKey = process.env.USER_KEY
    console.log(baseUrl);
    
    const sendOTP = baseUrl + "/user/login/otp/send"
    const res = await fetch(sendOTP, {
        headers: {
            "content-type": "application/json",
            "accept": "*/*",
        },
        method: "POST",
        body: JSON.stringify({
            user_key: "" + userKey
        })
    })

    const data = await res.json()
    const requestId = data.data.request_id

    const verifyOTP = baseUrl + "/user/login/otp/verify"
    const body = JSON.stringify({
        request_id: requestId,
        otp: "100200"
    })
    const result = await fetch(verifyOTP, {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "content-type": "application/json",
            "x-user-id": ""
        },
        body
    });

    const cookie = result.headers.get("set-cookie").split(";")[0]
    const userId = result.headers.get("x-user-id")
    
    return {
        cookie: cookie,
        userId: userId
    }

}