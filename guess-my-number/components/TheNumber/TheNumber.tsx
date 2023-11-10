import styles from "./TheNumber.module.css"

type Props = {
    number: number | undefined,
    userNum: number
}

export function TheNumber({number, userNum}: Props){

    return(
        <div className={styles.TheNumber}>
            <p className={styles.number}>{userNum === number ? number : '?'}</p>
        </div>
    )
}