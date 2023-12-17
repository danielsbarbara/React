export async function fetchRuns(userId: any){
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'aplication/json'}
    }

    const res = await fetch(`/api/v1/runs-pratice/user/${userId}`, options)
    if(res.status === 200){
        const body = await res.json()
        return body.result;
    }
    return false
}