import styles from "./TargetCards.module.css"

interface TargetsProps {
    targets: Array<TargetType> | undefined
    balance: Array<BalanceType> | undefined
}

interface TargetType {
    description: string | undefined,
    targetValue: string | undefined
}

interface BalPropreties {
    amount: string
}

interface BalanceType {
    balance: string | undefined
    amount: string | undefined
}

export function TargetCards({targets, balance}: TargetsProps){
    const AccountBalance: any= balance?.reduce((acc: number, bal: BalanceType) => acc += Number(bal.amount), 0)
    return(
        <div className={styles.cardContainer}>
            {targets?.map((target: any) => 
            <div className={styles.content}>
                <div className={styles.descrNtarget}>
                    <p>Description: {target.description}</p>
                    <p>Target Value: {target.targetValue}€</p>
                </div>
                <div className={styles.values}>
                    <p>Missing: {target.targetValue - AccountBalance <= 0 ? '0' : target.targetValue - AccountBalance}€</p>
                    <p>After get the item: {AccountBalance - target.targetValue <= 0 ? '0' : AccountBalance - target.targetValue}€</p>
                </div>
            </div>
            )}
        </div>
    )
}



{/* <div className={styles.container}>
                <div className={styles.descrNtarget}>
                    <p>description</p>
                    <p>Value target</p>
                </div>
                <div className={styles.values}>
                    <p>How much is missing</p>
                    <p>Total after get the target</p>
                </div>
            </div> */}