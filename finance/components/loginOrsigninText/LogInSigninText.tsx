import styles from "./LoginSigninText.module.css"

interface textProps {
    text: string
}

export function LoginSigninText({text}: textProps){
    return(
        <h4>{text}</h4>
    )
}