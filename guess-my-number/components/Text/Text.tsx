import styles from "./Text.module.css"

type TextProps = {
    text: string
}

export function Text({text}: TextProps){
    return(
        <div>
            <p className={styles.text}>{text}</p>
        </div>
    )
}