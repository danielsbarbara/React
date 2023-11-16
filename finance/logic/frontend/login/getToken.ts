interface Token {
    token: string,
    name: string
}

export function token(): Token | null{
    const userInfo = localStorage.getItem('token')
        return userInfo ? JSON.parse(userInfo) : null
}