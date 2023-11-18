import styles from "./Movements.module.css"

interface movType {
    mov: any
}


export function Movements({ mov }: movType) {
    return (
        <div className={styles.mov}>
            {mov.map((trans: any, i: any) =>
                <div className={styles.content}>
                    <p>{trans.description}</p>
                    <p>{trans.date}</p>
                    <p>{trans.amount}€</p>
                </div>
            )}
        </div>
    )
}