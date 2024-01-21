import { Title } from "@/components/Title"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import { checkCode, resetPw } from "@/logic/frontend/resetPw"
import { useRouter } from "next/navigation"

interface infoType {
    email: string 
    code: number | undefined
}

interface passType {
    password: string 
    confirmPassword: string
}

export default function ResetPw(){
    const [info, setInfo] = useState<infoType>({email: '', code: undefined})
    const [pw, setPw] = useState<passType>({password: '', confirmPassword: ''})
    const [pwInput, setPwInput] = useState<Boolean>(false)

    const notifySuccess = (msg: string) => toast.success(msg)
    const notifyError = (msg: string) => toast.error(msg)
    const router = useRouter()
    async function submitCode() {
        if(!info.email || !info.code) return notifyError('Preenche os campos')
        const validateCode = await checkCode(info)
        if(!validateCode) return notifyError('Email ou código inválidos, tenta de novo')
        setPwInput(true)
    }

    async function changePw() {
        if(pw.password != pw.confirmPassword) return notifyError('As passwords têm de ser iguais')
        const result = await resetPw(info.email, pw.password)
        if(!result) return notifyError('Ocorreu um erro, tenta novamente')
        notifySuccess('Password mudada com sucesso!')
        setTimeout(() => router.push('/'), 2000)
    }
    return(
        <div className="flex flex-col gap-5 items-center">
            <Title title='Recuperar a password'/>
            {
            !pwInput ?
            <>
            <p>Insere o teu email e o código que te foi enviado.</p>
            <input 
            className="border-black border-[1px] w-[70%] text-center"
            type="email" 
            placeholder="email"
            value={info?.email}
            onChange={(e) => setInfo((prev: infoType) => ({...prev, email: e.target.value}))}
            />
            <input 
            className="border-black border-[1px] w-[70%] text-center"
            type="number" 
            placeholder="código"
            value={info?.code}
            onChange={(e) => setInfo((prev: infoType) => ({...prev, code: Number(e.target.value)}))}
            />
            <button
            onClick={submitCode} 
            className="bg-slate-600 w-[40%] text-white">Verificar código</button>
            </>
            :
            <>
            <input 
            className="border-black border-[1px] w-[70%] text-center"
            type="password" 
            placeholder="Nova Password"
            value={pw.password}
            onChange={(e) => setPw((prev:passType) => ({...prev, password: e.target.value}))}
            />
            <input 
            className="border-black border-[1px] w-[70%] text-center"
            type="password" 
            placeholder="Confirmar Password"
            value={pw.confirmPassword}
            onChange={(e) => setPw((prev:passType) => ({...prev, confirmPassword: e.target.value}))}
            />
            <button className="bg-slate-500" onClick={changePw}>Enviar a password</button>
            </>
            }
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
        </div>
    )
}