export async function login(info){
    if(!info.email || !info.password) return
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.2.0' },
            body: JSON.stringify({ email: info.email, password: info.password })
        };
        const res = await fetch('api/login', options)
        if(res.status === 200) {
            const body = await res.json()
            if(body){
                const options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.2.0' },
                    body: JSON.stringify({ email: info.email})
                };
                const restoken = await fetch('api/gettoken', options)
                if(restoken.status === 200) {
                    const body = await restoken.json()
                   return body
                }
            } else {
                return false
            }
        }
        return 'Erro'
}