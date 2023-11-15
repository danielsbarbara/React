import styles from "./LoginSigninText.module.css"

interface textProps {
    text: string
}

export function LoginSigninText({text}: textProps){
    return(
        <h2 className={styles.h}>{text}</h2>
    )
}