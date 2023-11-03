export default async function fetchForMin(info){
    const res = await fetch(`/api/time/${info.year}/${info.month}/${info.select}`)
    if(res.status === 200){
        const body = await res.json()
        return body
    }
    return []
}