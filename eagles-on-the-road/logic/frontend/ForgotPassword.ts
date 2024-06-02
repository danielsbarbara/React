export async function checkIfEmail(email: string) {
    const result = await fetch(`/api/v1/forgotpw/${email}`)
    const body = await result.json()
    return body.result ? true : false
}