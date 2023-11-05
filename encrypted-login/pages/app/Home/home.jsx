import { useRouter } from "next/router";
import styles from "./home.module.css"
import { Title } from "@/components/Title/Title";
import { checkLocalStorage } from "@/frontendlogic/getToken";
import { useEffect } from "react";

export default function Home(){
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            const auth = JSON.parse(localStorage.getItem('token')) ?? false
            if(!auth) router.push('/')  
        }, 1000);
    },[])

    function goBack(){
        router.push('/')
        localStorage.removeItem('token')
    }

    return(
        <div className={styles.container}>
            <button onClick={() => goBack()}>🔙</button>
            <Title title= 'Bem vindo'/>
        </div>
    )
}