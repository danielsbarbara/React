import { Button } from "@/components/Button/Button";
import { Form } from "@/components/Form/Form";
import { Title } from "@/components/Title/Title";
import styles from "./Register.module.css"
import { useState } from "react";

export default function Register() {
    const [info, setInfo] = useState({ name: '', email: '', password: '' })

    return (
        <div className={styles.container}>
            <div className={styles.inputsContainer}>
                <div className={styles.image}>
                </div>
                <div className={styles.title}>
                    <Title title="Bem-Vindo" />
                </div>
                <div className={styles.form}>
                    <Form
                        type="name"
                        description="nome"
                        info={info}
                        setInfo={setInfo}
                    />
                    <Form
                        type="email"
                        description="@email"
                        info={info}
                        setInfo={setInfo}
                    />
                    <Form
                        type="password"
                        description="Password"
                        info={info}
                        setInfo={setInfo}
                    />
                    <Button
                        info={info}
                        page='registo' />
                </div>
            </div>
        </div>
    )
}