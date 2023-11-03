export async function fetchTop5(value, info, year){
    if(value === 1){
        const res = await fetch(`/api/top5/${info}`)
        if(res.status === 200){
            const body = await res.json()
            return body.result
        } else {
            return []
        }
    } else if(value === 2) {
        const res = await fetch(`/api/${year}/${info}`)
        if(res.status === 200){
            const body = await res.json()
            return body.result
        }
        return []
    }
    
}