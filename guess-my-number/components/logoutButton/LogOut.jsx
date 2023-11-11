import { useRouter } from "next/navigation"
import styles from "./LogOut.module.css"

export function LogOut(){
    const router = useRouter()
    function logOut(){
        localStorage.removeItem('token')
        router.push('/')
    }

    return(
        <div className={styles.container} onClick={logOut}>
            <p className={styles.logout}>LOG OUT!</p>
        </div>
    )
}