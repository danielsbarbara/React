interface infoObject {
    email: string | undefined
    password: string | undefined
}



export async function logIn(info: infoObject){
    if(!info.email || !info.email.includes('@')) return 'Invalid email'
    if(!info.password) return 'Invalid password'

    const options = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: info.email, password: info.password})
    }
    const res: any = await fetch('api/v1/login', options)
    if(res.status === 200){
        const body: any = await res.json()
        return body.result
    } else {
        const body: any = await res.json()
        return body.result
    }
}