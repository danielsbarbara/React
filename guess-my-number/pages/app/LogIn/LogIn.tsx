import { Button } from "@/components/Button/Button";
import { Forms } from "@/components/Forms/Forms";
import { Title } from "@/components/Title/Title";
import styles from "./LogIn.module.css"
import React, { useState } from "react";



export default function LogIn(){
    const [register, setRegister] = useState(false)
    const [info, setInfo] = useState({name: '', email: '', password: ''})

 return(
    <div className={styles.container}>
        <Title title="GUESS MY NUMBER"/>
        <Title title={register ? "SIGN IN" : "LOG IN"}/>
        <div className={styles.forms}>
            {register && <Forms type="name" placeholder="NAME" setInfo={setInfo} info={info}/>}
            <Forms type="email" placeholder="@EMAIL" setInfo={setInfo} info={info}/>
            <Forms type="password" placeholder="PASSWORD" setInfo={setInfo} info={info}/>
        </div>
        <div className={styles.buttons}>
            <Button description={register ? "SUBMIT" : "ENTER"} setRegister={setRegister} info={info}/>
            <Button description={register ? "BACK" : "REGISTER"} setRegister={setRegister} info={info}/>
        </div>
    </div>
 )
}