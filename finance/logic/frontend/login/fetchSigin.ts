interface infoObj {
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    confirmPassword: string | undefined
}

export async function fetchSignin(info: infoObj) {
    if(!info.name) return 'You have to write a name'
    if(!info.email || !info.email.includes('@')) return 'Invalid email'
    if(!info.password) return 'Must have a password'
    if(!info.confirmPassword) return 'You must confirm your password'
    if(info.password !== info.confirmPassword) return 'Passwords must be the same'

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: info.name, email: info.email, password: info.password})
    }
    const res = await fetch('api/v1/signin', options)
    const body = await res.json()
    if(res.status === 200){
        return true
    } else {
        return body.result
    }
}