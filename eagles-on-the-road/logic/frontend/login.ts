interface infoType {
    name: string,
    email: string,
    password: string,
    confirmPassword: string | undefined,
}

export async function login(description: string, info: infoType){
    if(description === 'Entrar'){
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: info.email, password: info.password})
        }

        const res = await fetch('/api/v1/login', options)
        const body = await res.json()
        return body.result
    }
    if(description === 'Submeter'){
        if(info.name === '') return 'Por favor insere um nome!'
        if(info.email === '' || !info.email.includes('@')) return 'Por favor insere um email válido!'
        if(info.password !== info.confirmPassword) return 'As passwords têm de ser iguais!'
        if(info.password.length < 5 ) return 'A password tem de ter no minimo 5 caracteres!'
        info.confirmPassword = undefined
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(info)
        }

        const res = await fetch('/api/v1/signin', options)
       
        return res.status === 200 ? true : 'Este email já está registado!'
    }
}