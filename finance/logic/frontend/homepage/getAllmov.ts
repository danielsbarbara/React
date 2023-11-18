export async function getAllMov(token: string | undefined) {
    if(!token) return false
    const options = {
        method: "GET",
        headers:  {'User-Agent': 'insomnia/8.4.2'}
    }

    const res = await fetch(`/api/v1/user/account/${token}`, options)
    if(res.status === 200){
        const body = await res.json()
        return body.result
    }
    return false
}