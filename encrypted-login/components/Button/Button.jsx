import { login } from "@/frontendlogic/login"
import styles from "./Button.module.css"
import { useRouter } from "next/navigation"
import { signin } from "../../frontendlogic/signin"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from "@/frontendlogic/getToken";

export function Button({ page, info }) {
    const router = useRouter()
    const notifyS = () => toast.success("Registo criado com sucesso")
    const notifyD = () => toast.error("Dados inválidos")

    async function onClick() {
        if (page === 'login') {
            const result = await login(info)
            if (!result) return notifyD()
            localStorage.setItem('token', JSON.stringify(result.result))
            router.push('app/Home/home')
        } else {
            const result = await signin(info)
            if (!result) return notifyD()
            notifyS()
            setTimeout(() => {
                async function fetchToken(){
                    const token = await getToken(info, result)
                    console.log(token)
                    localStorage.setItem('token', JSON.stringify(token.result))
                    router.push('/app/Home/home')
                }
                fetchToken()
            }, 2000)
        }
    }
    function gotoRegisterPage() {
        router.push('app/Register/RegisterPage')
    }
    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={onClick}>{page === 'login' ? 'Entrar' : 'Submeter'}</button>
            {page === 'login' && <button className={styles.button} onClick={() => gotoRegisterPage()}>Registar</button>}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}