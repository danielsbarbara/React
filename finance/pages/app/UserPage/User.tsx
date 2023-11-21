import { token } from "@/logic/frontend/login/getToken"
import styles from "./User.module.css"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/Navbar/Navbar"

interface tokenType {
    token: string,
    name: string
}

interface stateType {
    name: string | undefined,
    email: string | undefined
}

export default function UserPage() {
    const [userInfo, setUserInfo] = useState<stateType>()

    useEffect(() => {
        const userInfo: tokenType | null = token()

        async function fetchUserInfo() {
            const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.4.2' } };

            const res = await fetch(`/api/v1/user/info/${userInfo?.token}`, options)
            if (res.status === 200) {
                const body = await res.json()
                setUserInfo(body.result)
            }
        }

        fetchUserInfo()
    }
        , [])

    return (
        <div className={styles.container}>
            <h2>Profile</h2>
            <div className={styles.photoContainer}>
                +
            </div>
            <p>{`nome: ${userInfo?.name}`}</p>
            <p>{`email: ${userInfo?.email}`}</p>
            <div className={styles.navbar}>
                <Navbar />
            </div>
        </div>
    )
}