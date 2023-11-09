import styles from "./inputNumber.module.css"

export function InputNumber(){
    return(
        <div className={styles.container}>
            <input type="number" className={styles.input}/>
        </div>
    )
}