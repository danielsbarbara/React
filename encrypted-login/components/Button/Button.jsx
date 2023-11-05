import { login } from "@/frontendlogic/login"
import styles from "./Button.module.css"
import { useRouter } from "next/navigation"
import { signin } from "../../frontendlogic/signin"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Button({ page, info }) {
    const router = useRouter()

    async function onClick() {

        if (page === 'login') {
            const result = await login(info)
            if (!result) return 
            localStorage.setItem('token', JSON.stringify(result.result))
        } else {
            const result = await signin(info)
            if(!result) return
            setTimeout(() => {
                localStorage.setItem('token', JSON.stringify(result.result))
            }, 1000)
        }
    }
    function gotoRegisterPage() {
        router.push('app/Register/RegisterPage')
    }
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={onClick}>{page === 'login' ? 'Entrar' : 'Submeter'}</button>
            {page === 'login' && <button className={styles.button} onClick={() => gotoRegisterPage()}>Registar</button>}
        </div>
    )
}