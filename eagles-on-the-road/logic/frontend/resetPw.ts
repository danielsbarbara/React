interface infoType {
    email: string | undefined
    code: number | undefined
}
export async function checkCode(info: infoType){
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(info) 
    }

    const res = await fetch('/api/v1/forgotpw/checkcode', options)

    if(res.status === 200) return true

    return false
}

interface resetPwType {
    email: string | undefined
    password: string | undefined
}

export async function resetPw(email: string, password: string) {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    }

    const result = await fetch('/api/v1/forgotpw/changepw', options)
    if(result.status === 200) return true
    return false
}