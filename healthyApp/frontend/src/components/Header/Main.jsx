import { List } from "./MainComponents/List"
import styles from "./Main.module.css"
import { useState } from "react"

export function Main() {
    const [showMenu, setShowMenu] = useState('')
    return (
        <div className={styles.container}>
            <button onClick={() =>
                showMenu === '' ? setShowMenu(true) :
                    setShowMenu(!showMenu)}
                className={styles.menubutton}
            >{(showMenu === '' || showMenu === false) ? '🧺' : '❌'}</button>
            <List
                showMenu={showMenu}
            />
            <div className={styles.content}>
                
            </div>
        </div>
    )
}