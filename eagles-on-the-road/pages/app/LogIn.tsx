import { Form } from "@/components/Form";
import { Title } from "@/components/Title";
import { ButtonLogIn } from "@/components/buttonLogIn";
import { login } from "@/logic/frontend/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface getInfoType{
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export default function Login(){
    const [getInfo, setInfo] = useState<getInfoType>({name: '', email: '', password: '', confirmPassword: ''})
    const [register, setRegister] = useState<Boolean | undefined>(false)
    const router = useRouter()
    const notifySuccess = (msg: string) => toast.success(msg);
    const notifyError = (msg: string) => toast.error(msg);

    async function buttonActions(description: string) {
        if(description === 'Registar') return setRegister(true)
        if(description === 'Cancelar') return setRegister(false)

        const result = await login(description, getInfo)

        if(typeof result === 'string') return notifyError(result)
        if(typeof result === 'boolean') {
            notifySuccess('Conta criada!')
           return setTimeout(() => setRegister(false), 1500)
        }
        localStorage.setItem('jwt', JSON.stringify(result.token))
        localStorage.setItem('userId', JSON.stringify(result._id))
        notifySuccess('Bem vindo!')
        setTimeout(() => router.push('/app/home'), 2000)
    }
    return(
        <>
        <div className="bg-eagle bg-cover bg-center h-screen flex flex-col gap-7 justify-center items-center">
            <div className="-translate-y-52 text-[2.5rem]">
                <Title title='Águias na estrada'/>
            </div>
            <div className="-translate-y-32 text-[1.5rem]">
                <Title title={register ? 'Registo' : 'Log In'}/>
            </div>
            <div className="h-40 flex flex-col gap-3">
                {register && <Form type='text' description='Nome' setInfo={setInfo} getInfo={getInfo}/>}
                <Form type='email' description='@email' setInfo={setInfo} getInfo={getInfo}/>
                <Form type='password' description='***Password***' setInfo={setInfo} getInfo={getInfo}/>
                {register && <Form type='password' description='Confirmar Password' setInfo={setInfo} getInfo={getInfo}/>}
            </div>
            <div className="flex gap-7">
                <ButtonLogIn description={register ? 'Submeter' : 'Entrar'} buttonAction={buttonActions}/>
                <ButtonLogIn description={register ? 'Cancelar' : 'Registar'} buttonAction={buttonActions}/>
            </div>
        </div>
        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            </>
    )
}