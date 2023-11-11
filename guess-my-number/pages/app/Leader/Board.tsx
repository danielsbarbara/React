import styles from "./Board.module.css"
import { LeaderBoardList } from "@/components/LeaderBoardList/LeaderBoardList"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
export default function LeaderBoard() {
    const [leaderBoard, setLeaderBoard] = useState()
    const router = useRouter()
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