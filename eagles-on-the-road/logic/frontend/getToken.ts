interface Token {
    token: string,
    name: string
}

export function token(description: string): Token | null {
    const userInfo = localStorage.getItem(`${description}`)
        return userInfo ? JSON.parse(userInfo) : null
}