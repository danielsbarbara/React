import styles from "./Balance.module.css"

interface balProps {
    balance: Array<balObje>,
}

interface balObje {
    amount: string
}

export function Balance({balance}: balProps){
    return(
        <p className={styles.balance}>{balance.reduce((acc, val) => acc += Number(val.amount)
        , 0)}€</p>
    )
}