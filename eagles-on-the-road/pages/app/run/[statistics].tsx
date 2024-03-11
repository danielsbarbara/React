import { validateToken } from "@/logic/frontend/fetchJWTToken"
import { token } from "@/logic/frontend/getToken"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface tokenType {
    token: string
}

export default function Statistics(){
    const [run, setRun] = useState()
    const router = useRouter()

    useEffect(() => {
        const jwt: tokenType | null = token('jwt')

        async function fetchUserInfo() {
            const isValidate = await validateToken(jwt) 
            if(!isValidate) return router.push('/')

            const query = router.query.statistics
            if(query) {
                console.log(query)
                const option = {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                }
                const fetchRun = await fetch(`/api/v1/runs-pratice/info/${query}`, option)
                if(fetchRun.status === 200){
                    const body = await fetchRun.json()
                    console.log(body.result)
                }
            }

        }
        fetchUserInfo()
    })
    return(
        <>
            olaa
        </>
    )
}