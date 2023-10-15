import { Header } from "./components/Header/Header"
import { Main } from "./components/Header/Main"
import { Footer } from "./components/Header/Footer"
import styles from "./HealthyApp.module.css"

export function HealthyApp(){
    return(
        <div className={styles.container}>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    )
}