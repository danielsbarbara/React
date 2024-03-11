export async function fetchLeaderBoard(value: string) {
    const options = {
        method: 'GET',
        headers: {'Content-type': 'aplication/json'}
    }

    const res = await fetch(`/api/v1/${value}`)
    if(res.status === 200){
        const body = await res.json()
        return body.result
    }
    return false
}