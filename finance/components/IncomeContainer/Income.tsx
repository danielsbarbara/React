import styles from "./Income.module.css"

interface Props {
    description: string
}

export function Income({description}: Props){
    return (
        <div className={description === "Income" ? styles.greenContainer : styles.redContainer}>
            <p>{description === "Income" ? 'Add' : ''} {description}</p>
            <input type="number" className={styles.input}/>
            <button className={styles.button}>Submit</button>
        </div>
    )
}