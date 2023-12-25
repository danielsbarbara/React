import { addNewRunOrPratice } from "@/logic/backend/runsNpratices/addNewRunPratice"
import { token } from "@/logic/frontend/getToken"
import { useRouter } from "next/router";
import { useState } from "react"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface infoType {
    type: string,
    description: string,
    km: string | number | undefined,
    time: string | number,
    date: string | number | readonly string[] | undefined
}

interface tokenType {
    token: string
}

export function RunForm(){
    const [getInfo, setInfo] = useState <infoType>({
        type: 'runs',
        description: '',
        km: '',
        time: '00:00',
        date: ''
    })
    const notifySuccess = (msg: string) => toast.success(msg);
    const notifyError = (msg: string) => toast.error(msg);
    const router = useRouter()

    function handlechange(event: string | undefined, field: string){
        setInfo(prev => ({...prev, [field]: event}))
    }

    async function submitForm(){
        if(!getInfo.description) return notifyError('Adiciona uma descrição / nome')
        if(!getInfo.km) return notifyError('Adiciona os km\'s percorridos!')
        if(!getInfo.time) return notifyError('Adiciona o tempo percorrido')
        if(!getInfo.date) return notifyError('Adiciona uma data')
        const userId: tokenType | null = token('userId') 
        const result = addNewRunOrPratice(getInfo, userId)
        if(!result) return notifyError('Ocorreu um erro, tenta novamente!')
        notifySuccess('Registado com sucesso')
        setTimeout(() => router.reload() ,1800)
    }

    return(
        <div className="flex flex-col w-full items-center text-center gap-3">
                <input
                className="text-center w-56"
                onChange={(e) => handlechange(e.target.value, 'description')}
                value={getInfo.description}
                type="text"
                placeholder="Descrição"/>

            <select 
            className=""
            value={getInfo.type}
            onChange={(e) => handlechange(e.target.value, 'type')}
            >
                <option value="runs">Corrida</option>
                <option value="practice">Treino</option>
            </select>

            <input 
            onChange={(e) => handlechange(e.target.value, 'date')}
            value={getInfo.date} 
            type="date" 
            placeholder="Data"
            />

            <input 
            onChange={(e) => handlechange(e.target.value, 'time')}
            value={getInfo.time} 
            type="time" 
            placeholder="Tempo"/>

            <input 
            className="text-center"
            onChange={(e) => handlechange(e.target.value, 'km')}
            value={getInfo.km} 
            type="number" 
            placeholder="Km's percorridos"/>

            <button className="text-white bg-red-500 w-20 h-7 rounded-lg" onClick={submitForm}>Submeter</button>
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