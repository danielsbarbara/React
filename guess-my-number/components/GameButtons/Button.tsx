import styles from "./Button.module.css"

type ButtonProps = {
    description: string,
    inputNum: number,
    randomNum: number | undefined, 
}

export function Button({description, inputNum, randomNum}: ButtonProps){
    return(
        <div>
            <button 
            className={styles.button} 
            >{description}</button>
        </div>
    )
}