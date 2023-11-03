import styles from "./Title.module.css"

export function Tittle({title}){
    return(
        <div>
            <h1 className={styles.title}>{title}</h1>
        </div>
    )
}