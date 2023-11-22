import { useRouter } from "next/navigation"
import styles from "./Navbar.module.css"

export function Navbar(){
    const router = useRouter()
    function handleChangePage(description: string){
        if(description === 'userprofile') router.push('/app/UserPage/User')
        if(description === 'home') router.push('/app/HomePage/Home')
        if(description === 'targets') router.push('/app/TargetPage/Target')
    }
    return (
        <div className={styles.containerNav}>
            <p onClick={() => handleChangePage('userprofile')}>user profile</p>
            <p onClick={() => handleChangePage('home')}>home</p>
            <p onClick={() => handleChangePage('targets')}>targets</p>
            <p>chat</p>
        </div>
    )
}