export async function fetchAllTargets(token: string | undefined) {
    const options = {
        method: 'GET',
        headers: {'User-Agent': 'insomnia/8.4.2'}
    }

    const res = await fetch(`/api/v1/user/targets/${token}`)
    if(res.status === 200){
        const body = await res.json()
        return body.result
    }
    return false
}