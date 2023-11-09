import styles from "./Title.module.css"

type title = {
    title: string
}

export function Title({title}: title){
    return(
        <div>
            <h1 className={title === "LOG IN" || title === "SIGN IN"  ? styles.h1 : styles.gameName}>{title}</h1>
        </div>
    )
}