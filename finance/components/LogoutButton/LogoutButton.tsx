import { useRouter } from "next/router"
import styles from "./LogoutButton.module.css"

export function LogoutButton(){
    const router = useRouter()
    function handeClick(){
        localStorage.removeItem('token')
        router.push('/')
    }
    return (
        <button onClick={handeClick} className={styles.button}>Log Out</button>
    )
}