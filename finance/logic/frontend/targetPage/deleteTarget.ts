import { useRouter } from "next/router"
import { token } from "../login/getToken"

interface User {
    name: string,
    token: string
}


export async function deleteTarget(targetDesc: string) {
    const user: User | null = token()
    const options = {method: 'DELETE', headers: {'User-Agent': 'insomnia/8.4.4'}}
    const res = await fetch(`/api/v1/user/targets/delete/${user?.token}/${targetDesc}`)
    if(res.status !== 200) return 'Something goes wrong!'
    return true
}