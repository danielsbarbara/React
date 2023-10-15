import { NavBar } from "./HeadersComponents/NavBar"
import styles from "./Header.module.css"
export function Header(){
    return(<div className={styles.headerContainer}> 
        <h1 className={styles.title}>Healthy App</h1>
        <NavBar/>
    </div>)
}