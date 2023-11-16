import styles from "./Navbar.module.css"

export function Navbar(){
    return (
        <div className={styles.containerNav}>
            <p>user profile</p>
            <p>home</p>
            <p>targets</p>
            <p>chat</p>
        </div>
    )
}