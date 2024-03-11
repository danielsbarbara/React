export async function fetchLeaderBoard(value: string) {
    const options = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(value)
    }
    console.log(value)
    const res = await fetch(`/api/v1/leaderboard`, options)
    if(res.status === 200){
        const body = await res.json()
        return body.result
    }
    return false
}