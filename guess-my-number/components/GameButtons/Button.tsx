import styles from "./Button.module.css"

type ButtonProps = {
    description: string,
    inputNum: number | string,
    randomNum: number | undefined, 
    resetAll: Function
}

export function Button({description, resetAll}: ButtonProps){
    return(
        <div>
            <button 
            className={styles.button} 
            onClick={() => resetAll(description)}
            >{description}</button>
        </div>
    )
}