import { Button } from "@/components/GameButtons/Button"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./Game.module.css"
import { Text } from "@/components/Text/Text"
import { InputNumber } from "@/components/inputNumber/InputNumber"
import { GameTitle } from "@/components/TitleGamePage/TitleGame"
import { TheNumber } from "@/components/TheNumber/TheNumber"
import { LogOut } from "@/components/logoutButton/LogOut"

type Token = {
    token: string
}

type inputField = {
    number: number | string
}
export default function Game() {
    const [inputNum, setInputNum] = useState('')
    const [randomNum, setRandomNum] = useState(0)
    const [currentScore, setCurrentScore] = useState(20)
    const [highScore, setHighScore] = useState(0)
    const [userNum, setUserNum] = useState(-1)
    let result: number = 0
    const router = useRouter()
    
    const token = (): Token | null => {
        const userToken = localStorage.getItem('token')
        return userToken ? JSON.parse(userToken) as Token : null
    }

    async function getRandomNum() {
        const res = await fetch('/api/v1/randomNumber')
        if (res.status === 200) {
            const body = await res.json()
            setRandomNum(body.result)
        }
    }

    async function getUserHighScore() {
        const userToken: Token | null = token()
        const res = await fetch(`/api/v1/${userToken}`)
        if(res.status === 200){
            const body = await res.json()
            setHighScore(body.result)
        }
    }

    async function SetHighScoreUser(currentScore: number){
        const userToken: Token | null = token()
        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ token: userToken, highscore: currentScore})
        }
        
        const res = await fetch('/api/v1/setHighScore', options)
        if(res.status === 200){
            const body = await res.json()
            setHighScore(body.result)
           
        }
    }

    useEffect(() => {
        if (token() === null) router.push('/')
        getRandomNum()
        getUserHighScore()
    }, [])

    function check(inputNum: number, randomNum: number, description: string) {
        setUserNum(inputNum)
        result = inputNum
        result !== randomNum && setCurrentScore(currentScore > 0 ? currentScore - 1 : currentScore)
        if (currentScore > highScore && result === randomNum) {
            setHighScore(currentScore)
            SetHighScoreUser(currentScore)
        }
    }

    function resetAllOrChangePage(description: string) {
        if(description === 'AGAIN!'){
            getRandomNum()
            setCurrentScore(20)
            setInputNum('')
            setUserNum(-1)
        } else {
            router.push('/app/Leader/Board')
        }
    }
    return (
        <div className={userNum === randomNum ? styles.win : styles.gamePage}>
            <div className={styles.ajustcontainer}>
                <div className={styles.Header}>
                    <Button
                        description="AGAIN!"
                        inputNum={inputNum}
                        randomNum={randomNum}
                        resetAll={resetAllOrChangePage}
                    />
                    <Button
                        description="LEADER BOARD"
                        inputNum={inputNum}
                        randomNum={randomNum}
                        resetAll={resetAllOrChangePage}
                    />
                
                    <LogOut />
                </div>
                <div className={styles.theNumber}>
                    <GameTitle />
                    <Text text="<Between 1 and 20>" currentScore={currentScore} highScore={highScore} />
                    <TheNumber number={randomNum} userNum={userNum} />
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
                        <Text text={userNum === -1 ? "LET'S START" : userNum > randomNum ? 'TO HIGH 📈' : userNum < randomNum ? 'TO LOW 📉' : 'WIN'}
                            currentScore={currentScore} highScore={highScore} />
                        <Text text="Score" currentScore={currentScore} highScore={highScore} />
                        <Text text="HighScore!" currentScore={currentScore} highScore={highScore} />
                    </div>
                </div>
            </div>
        </div>
    )
}