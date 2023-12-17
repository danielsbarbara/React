interface infoType {
    type: string,
    description: string,
    km: string | number | undefined,
    time: string | number,
    date: any
}

interface tokenType {
    token: string
}

export async function addNewRunOrPratice(info: infoType, userId: tokenType | null){

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId: userId, 
            type: info.type, 
            description: info.description,
            km: +info.km!,
            time: info.time,
            date: new Date(info.date),
        })
    }
    const res = await fetch('/api/v1/runs-pratice/new', options)
    if(res.status === 200){
        return true
    }

    return false
}