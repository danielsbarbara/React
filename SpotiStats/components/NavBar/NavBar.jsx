
import { useRouter } from "next/navigation"
import styles from "./NavBar.module.css"

export function NavBar(){
    const router = useRouter()

    function handleClick(){
        router.push("/app/User/User")
    }
    return(
        <div className={styles.container}>
            <img src="../user-286.svg" className={styles.icon} onClick={handleClick}/>
        </div>
    )
}