import { deleteTarget } from "@/logic/frontend/targetPage/deleteTarget"
import styles from "./TargetCards.module.css"

interface TargetsProps {
    targets: Array<TargetType> | undefined
    balance: Array<BalanceType> | undefined,
    deleteUserTarget: Function
}

interface TargetType {
    description: string | undefined,
    targetValue: string | undefined,
    
}

interface BalPropreties {
    amount: string
}

interface BalanceType {
    balance: string | undefined
    amount: string | undefined
}

export function TargetCards({targets, balance, deleteUserTarget}: TargetsProps){
    const AccountBalance: any= balance?.reduce((acc: number, bal: BalanceType) => acc += Number(bal.amount), 0)

    return(
        <div className={styles.cardContainer}>
            {targets && targets.length > 0 ? targets?.map((target: any, index: number) => 
            <div className={styles.content}>
                <p className={styles.deleteIcon} onClick={() => deleteUserTarget(target.description)}>❌</p>
                <div className={styles.descrNtarget}>
                    <p>Description: {target.description}</p>
                    <p>Value: {target.targetValue}€</p>
                </div>
                <div className={styles.values}>
                    <p>Missing: {target.targetValue - AccountBalance <= 0 ? '0' : target.targetValue - AccountBalance}€</p>
                    <p>Balance after get the item: {AccountBalance - target.targetValue <= 0 ? '0' : AccountBalance - target.targetValue}€</p>
                </div>
            </div>
            ) : <p className={styles.undefinedValue}>You don't have any target</p>}
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