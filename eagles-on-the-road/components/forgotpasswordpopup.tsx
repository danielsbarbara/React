import { useState } from "react"
import { Loading } from "./loading"
import { checkIfEmail } from "@/logic/frontend/ForgotPassword"
import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

interface propsType{
    setForgotPw: Function
    notifyError: Function
    notifySuccess: Function
}

export function ForgotPassword({setForgotPw, notifyError, notifySuccess}: propsType){
    const [email, setEmail] = useState<string>('')
    const [loading, setLoading] = useState<Boolean>(false)

   async function checkEmail(){
        setLoading(true)
        if(!email) return notifyError('Introduz um email válido')
        const checkEmail = await checkIfEmail(email)
        if(checkEmail){ 
            setLoading(false)
            setForgotPw(false)
            return notifySuccess('Email enviado!')
        }
        setLoading(false)
        return notifyError('Verifica o teu email')
    }

    return(
        <>  
            <p>
                Insere o teu email para recuperar a password, 
                irás receber um link no teu email para colocares uma nova password
            </p>
            <input
            value={email} 
            type="email" 
            placeholder="@Email" 
            className="text-center text-black" 
            onChange={(e) => setEmail(e.target.value)}/>

            {loading ?
            <Loading/>
            :
            <button onClick={() => checkEmail()} className="bg-red-500 w-32 self-center rounded-lg">Enviar</button>
            }
        </>
    )
}