import styles from "./Text.module.css"

type TextProps = {
    text: string,
    currentScore: number,
    highScore: number
}

export function Text({text, currentScore, highScore}: TextProps){
    return(
        <div>
            <p className={styles.text}>{text === 'Score' ? 
            `SCORE: ${currentScore}.` : 
            text === 'HighScore!' ? 
            `HIGHSCORE!: ${highScore}` : text}</p>
        </div>
    )
}