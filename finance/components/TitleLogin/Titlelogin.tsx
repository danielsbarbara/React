import styles from "./Title.module.css"

interface titleProps{
    title: string,
}

export function Titlelogin({title}: titleProps){
    return(
        <h1 className={styles.h1}>{title}</h1>
    )
}