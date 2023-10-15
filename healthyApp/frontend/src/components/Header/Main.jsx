import { List } from "./MainComponents/List"
import styles from "./Main.module.css"

export function Main(){
    return(
        <div className={styles.container}>
            <List/>
        </div>
    )
}