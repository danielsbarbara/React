import styles from "./NavBar.module.css"
import userLogo from "../../../assets/images/userlogin.png"
import passwordIcon from "../../../assets/images/passwordIcon.png"
export function NavBar() {
    return (
        <div className={styles.container}>
            <ul className={styles.listLogIn}>
                <div className={styles.userContainer}>
                    <img src={userLogo} alt="User LogIn Icon" className={styles.userLogInIcon} />
                    <input type="text" placeholder="User"/>
                </div>
                <div className={styles.passwordContainer}>
                    <img src={passwordIcon} alt="Password Icon" className={styles.passwordIcon}/>
                    <input type="password" placeholder="password"/>
                </div>
            </ul>
        </div>
    )
}