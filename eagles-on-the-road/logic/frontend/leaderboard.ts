export async function fetchLeaderBoard() {
    const options = {
        method: 'GET',
        headers: {'Content-type': 'aplication/json'}
    }

    const res = await fetch('/api/v1/leaderboard')
    if(res.status === 200){
        const body = await res.json()
        return body.result
    }
    return false
}