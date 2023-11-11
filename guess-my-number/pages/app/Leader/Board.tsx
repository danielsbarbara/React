import styles from "./Board.module.css"
import { LeaderBoardList } from "@/components/LeaderBoardList/LeaderBoardList"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Token = {
    token: string
}

export default function LeaderBoard() {
    const [leaderBoard, setLeaderBoard] = useState()
    const router = useRouter()

    const token = (): Token | null => {
        const userToken = localStorage.getItem('token')
        return userToken ? JSON.parse(userToken) as Token : null
    }

    async function getLeaderBoard() {
        const res = await fetch('/api/v1/getleaderboard')
        if (res.status === 200) {
            const body = await res.json()
            setLeaderBoard(body.result)
        }
    }

    function goBack(){
        router.push('/app/GamePage/Game')
    }

    useEffect(() => {
        if (token() === null) router.push('/')
        getLeaderBoard()
    }, [])

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>LEADER BOARD</h1>
            <div className={styles.leaderboard}>
                <LeaderBoardList leaderBoard={leaderBoard} />
            </div>
            <button className={styles.backbutton} onClick={goBack}>{`${'< BACK'}`}</button>
        </div>
    )
}