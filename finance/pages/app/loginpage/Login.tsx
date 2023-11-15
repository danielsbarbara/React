import { Forms } from "@/components/Forms/Forms";
import { LogInButtons } from "@/components/LogInButtons/LogInButtons";
import { Titlelogin } from "@/components/TitleLogin/Titlelogin";
import { LoginSigninText } from "@/components/loginOrsigninText/LogInSigninText";
import styles from "./Login.module.css"
import { useState } from "react";
import { logIn } from "@/logic/frontend/login/fetchLogIn";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { fetchSignin } from "@/logic/frontend/login/fetchSigin";


export default function Login() {
    const [isLogin, setisLogin] = useState(true)
    const [info, setInfo] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const notifyS = (msg: string) => toast.success(msg)
    const notifyE = (msg: string) => toast.error(msg)

    async function submit(description: string) {
        if (description === "Register") return setisLogin(false)
        if (description === "Back") return setisLogin(true)
        if (description === "Enter") {
            const result: string = await logIn(info)
            if (result.length < 24) return notifyE(result)
            notifyS("Welcome!")
            localStorage.setItem("token", result)
            return
        } else if (description === "Submit") {
            const result: string | Boolean = await fetchSignin(info)
            if (typeof result === 'string') return notifyE(result)
            notifyS("Registration successful")
            setisLogin(true)
            return
        }
    }
    return (
        <div className={styles.page}>
            <div className={styles.titles}>
                <Titlelogin />
                <LoginSigninText text={isLogin ? "Log In" : "Sign In"} />
            </div>
            <div className={styles.forms}>
                {!isLogin && <Forms description="Name" type="text" info={info} setInfo={setInfo} />}
                <Forms description="Email" type="email" info={info} setInfo={setInfo} />
                <Forms description="Password" type="password" info={info} setInfo={setInfo} />
                {!isLogin && <Forms description="Confirm Password" type="password" info={info} setInfo={setInfo} />}
            </div>
            <div className={styles.button}>
                <LogInButtons description={isLogin ? "Enter" : "Submit"} submit={submit} />
                <LogInButtons description={isLogin ? "Register" : "Back"} submit={submit} />
            </div>
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
                <video src="/videos/loginVideo.mp4" autoPlay muted loop className={styles.video}></video>
        </div>
    )
}