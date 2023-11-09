import { Button } from "@/components/GameButtons/Button"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styles from "./Game.module.css"
import { Text } from "@/components/Text/Text"
import { Title } from "@/components/Title/Title"
import { InputNumber } from "@/components/inputNumber/InputNumber"
import { GameTitle } from "@/components/TitleGamePage/TitleGame"
import { TheNumber } from "@/components/TheNumber/TheNumber"
type Token = {
    token: string
}
export default function Game() {
    const router = useRouter()

    useEffect(() => {
        const token = (): Token | null => {
            const userToken = localStorage.getItem('token')
            return userToken ? JSON.parse(userToken) as Token : null
        }
        if (token() === null) router.push('/')
    }, [])

    return (
        <div className={styles.gamePage}>
            <div className={styles.Header}>
                <Button description="AGAIN!" />
                <Text text="<Between 1 and 20>" />
            </div>
                <div className={styles.theNumber}>
                    <GameTitle/>
                    <TheNumber/>
                </div>
            <div className={styles.interactiveContainer}>
                <div className={styles.inputAndButton}>
                    <InputNumber />
                    <Button description="CHECK!" />
                </div>
                <div className={styles.statistics}>
                    <Text text="." />
                    <Text text="Score:" />
                    <Text text="HighScore! :" />
                </div>
            </div>
        </div>
    )
}