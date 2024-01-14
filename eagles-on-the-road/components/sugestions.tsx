import { useState } from "react"
import React from 'react';


interface propsType {
    name: string | undefined
    notifySuccess: Function
    notifyError: Function
}

export function Sugestion({name, notifyError, notifySuccess}: propsType){
    const [desc, setDesc] = useState<string>('')
    const [loading, setLoading] = useState<Boolean>(false)

    function handleChange(e: any){
        setDesc(e)
    }

    async function submitDesc() {
        setLoading(true)
        if(!desc) return notifyError('Escreve algo!')
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application-json'},
            body: JSON.stringify({name, description: desc})
        }

        const res = await fetch('/api/v1/sugestions', options)

        if(res.status === 201){ 
             notifySuccess('Iremos ver a tua sugestão em breve!')
             setDesc('')
             setLoading(false)
             return
            }
            notifyError('Não foi possivel registar a tua sugestão, tenta novamente mais tarde')
            setDesc('')
            setLoading(false)
    }   

        
    
    return(
        <>
            <textarea className="border-[1px] border-black w-[90%]" 
            placeholder='Aqui podes sugerir novos updates para a aplicação!' 
            value={desc}
            onChange={(e) => handleChange(e.target.value)}>
            </textarea>
            <button disabled={desc ? false : true}
            onClick={() => submitDesc()}
            className={`${desc ? 'bg-red-500' : 'bg-slate-500'} transition duration-500 rounded-lg w-24 h-10 text-white`}
            >Enviar</button>
        </>
    )
}