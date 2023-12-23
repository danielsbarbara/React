export async function validateToken(jwt: any) {
    const options = {
        method: 'GET',
        headers: {'Authorization': `jwt ${jwt}`}
    }
    const res = await fetch('/api/v1/token', options)
    if(res.status === 200){
        return true
    }
    return false
}