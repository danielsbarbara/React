import { register } from "module"
import styles from "./Button.module.css"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

type descriptionProps = {
    description: string,
    setRegister: any,
    info: any
}

export function Button({ description, setRegister, info }: descriptionProps) {
    const notifyF = (sentence: string) => toast.error(sentence)
    const notifyS = (sentence: string) => toast.success(sentence)
    const router = useRouter()
    
    async function handleClick(value: string) {
        if (value === 'REGISTER') setRegister(true)
        if (value === 'BACK') setRegister(false)
        if (value === 'ENTER') {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
                body: JSON.stringify({ email: info.email, password: info.password })
            };
        
            const res = await fetch('api/v1/logIn', options)
            if (res.status === 200) {
                const body = await res.json()
                if (body.result.length === 0) return notifyF("INVALID DATA")
                notifyS("WELCOME!")
                localStorage.setItem('token', JSON.stringify(body.result))
                setTimeout(() => {
                    router.push('app/GamePage/Game')
                }, 2000)
            }
        }

        if (value === 'SUBMIT') {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
                body: JSON.stringify({ name: info.name, email: info.email, password: info.password })
            };
            
            const res = await fetch('api/v1/signIn', options)
            if (res.status === 200) {
                notifyS("ACCOUNT CREATED!")
                setTimeout(() => {
                    setRegister(false)
                }, 2000)
            } else{
                notifyF("USER ALREADY EXISTS!")
            }
        }
    }

    return (
        <div>
            <button className={styles.button} onClick={() => handleClick(description)}>{description}</button>
            <ToastContainer
                position="bottom-center"
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