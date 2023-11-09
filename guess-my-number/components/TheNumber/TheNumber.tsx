import styles from "./TheNumber.module.css"

export function TheNumber(){
    return(
        <div className={styles.TheNumber}>
            <p className={styles.number}>10</p>
        </div>
    )
}