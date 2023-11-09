import styles from "./Button.module.css"

type ButtonProps = {
    description: string
}

export function Button({description}: ButtonProps){
    return(
        <div>
            <button className={styles.button}>{description}</button>
        </div>
    )
}