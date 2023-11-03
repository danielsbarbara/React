export default async function fetchToGetYears(){
    const res = await fetch('/api/getAllYears')
    if(res.status===200){
        const body = await res.json()
        return body
    }
}