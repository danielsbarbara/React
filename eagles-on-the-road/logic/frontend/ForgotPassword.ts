export async function checkIfEmail(email: string) {
    const result = await fetch(`/api/v1/forgotpw/${email}`)
    const body = await result.json()
    if(body.result) return true
    return false
}