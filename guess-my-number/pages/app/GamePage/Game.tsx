import { Button } from "@/components/GameButtons/Button"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./Game.module.css"
import { Text } from "@/components/Text/Text"
import { InputNumber } from "@/components/inputNumber/InputNumber"
import { GameTitle } from "@/components/TitleGamePage/TitleGame"
import { TheNumber } from "@/components/TheNumber/TheNumber"

type Token = {
    token: string
}
export default function Game() {
    const [inputNum, setInputNum] = useState(0)
    const [randomNum, setRandomNum] = useState(0)
    const [currentScore, setCurrentScore] = useState(20)
    const [highScore, setHighScore] = useState(0)
    const [userNum, setUserNum] = useState(0)
    let result: number = 0
    const router = useRouter()

    async function getRandomNum() {
        const res = await fetch('/api/v1/randomNumber')
        if (res.status === 200) {
            const body = await res.json()
            setRandomNum(body.result)
        }
    }

    useEffect(() => {
        const token = (): Token | null => {
            const userToken = localStorage.getItem('token')
            return userToken ? JSON.parse(userToken) as Token : null
        }
        if (token() === null) router.push('/')
        getRandomNum()
    }, [])

    function check(inputNum: number, randomNum: number, description: string){
        setUserNum(inputNum)
        result = inputNum
        result !== randomNum && setCurrentScore(currentScore > 0 ? currentScore -1 : currentScore)
        if(result > highScore && result === randomNum) setHighScore(currentScore)
    }
    
    return (
        <div className={userNum === randomNum ? styles.win : styles.gamePage}>
            <div className={styles.Header}>
                <Button
                    description="AGAIN!"
                    inputNum={inputNum}
                    randomNum={randomNum}
                />
                <Text text="<Between 1 and 20>" currentScore={currentScore} highScore={highScore}/>
            </div>
            <div className={styles.theNumber}>
                <GameTitle />
                <TheNumber number={randomNum} userNum={userNum}/>
            </div>
            <div className={styles.interactiveContainer}>
                <div className={styles.inputAndButton}>
                    <InputNumber 
                    setInputNum={setInputNum} 
                    inputNum={inputNum}
                    randomNum={randomNum}
                    check={check}
                    userNum={userNum}
                    />
                </div>
                <div className={styles.statistics}>
                    <Text text={userNum === 0 ? "LET'S START" : userNum > randomNum ? 'To high' : userNum < randomNum ? 'To Low' : 'WIN'} 
                    currentScore={currentScore} highScore={highScore}/>
                    <Text text="Score" currentScore={currentScore} highScore={highScore}/>
                    <Text text="HighScore!" currentScore={currentScore} highScore={highScore}/>
                </div>
            </div>
        </div>
    )
}