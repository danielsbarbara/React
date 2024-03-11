export async function fetchLeaderBoard(value: string) {
    const options = {
        method: 'GET',
        headers: {'Content-type': 'aplication/json'}
    }
    console.log(value)
    const res = await fetch(`/api/v1/${value}`, options)
    if(res.status === 200){
        const body = await res.json()
        return body.result
    }
    return false
}