import { useRouter } from "next/navigation"
import styles from "./Navbar.module.css"

export function Navbar(){
    const router = useRouter()
    function handleChangePage(description: string){
        if(description === 'userprofile') router.push('/app/UserPage/User')
    }
    return (
        <div className={styles.containerNav}>
            <p onClick={() => handleChangePage('userprofile')}>user profile</p>
            <p>home</p>
            <p>targets</p>
            <p>chat</p>
        </div>
    )
}