import { deleteRunPratice } from "@/logic/frontend/run-pratice/deleteRun"
import { useRouter } from "next/router";
import { useState } from "react"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RunsCardProps {
    userRuns: any,
    showRuns: number
}

interface userRunsType {
    _id: string,
    description: string,
    time: string,
    date: string,
    km: number,
    type: string
}


export function RunsCard({userRuns, showRuns}: RunsCardProps) {
    const [showButton, setShowButton] = useState(false)
    const [index, setIndex] = useState(-1)
    const notifySuccess = (msg: string) => toast.success(msg);
    const notifyError = (msg: string) => toast.error(msg);
    const router = useRouter()

    async function deleteRun(run: userRunsType){
        const result = await deleteRunPratice(run)
        result ? notifySuccess('Apagado com successo!') : notifyError('Ocorreu um erro, tenta novamente')
        setTimeout(() => router.reload() ,1800)
    }
    const dataOptions: any = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }

    return( 
        <div className="w-[95%] overflow-auto no-scrollbar flex flex-col items-center gap-8" key={Math.random()}>
            {showRuns === 2 ? 
            userRuns?.map((run: userRunsType, i:number) => run.type !== 'practice' &&
            <>
            <div 
            key={Math.random()} 
            className="w-[90%] flex justify-between border-[1px] border-black/50 p-2 rounded-lg shadow-2xl"
            onClick={() => {setShowButton(!showButton); setIndex(i)}}
            >
                <div className="p-2">
                    <p className="text-xl">{run.description}</p>
                    <p>{new Intl.DateTimeFormat('pt-PT', dataOptions).format(new Date(run.date))}</p>
                </div>
                <div className="text-center p-2">
                    <p>{run.km} km</p>
                    <p>{run.time}h</p>
                </div>
            </div>
            {showButton && index === i && <button onClick={() => deleteRun(run)}>Eliminar? ❌</button>}
            </>
            ) : showRuns === 1 ? userRuns?.map((run: userRunsType, i: number) => run.type !== 'runs' &&
            <>
            <div 
            key={Math.random()} 
            className="flex justify-between w-[90%] border-[1px] border-black/50 p-2 rounded-lg shadow-2xl"
            onClick={() => {setShowButton(!showButton); setIndex(i)}}
            >
                <div className="p-2">
                    <p className="text-xl">{run.description}</p>
                    <p>{new Intl.DateTimeFormat('pt-PT', dataOptions).format(new Date(run.date))}</p>
                </div>
                <div className="p-2">
                    <p>{run.km} km</p>
                    <p>{run.time} h</p>
                </div>
            </div>
            {showButton && index === i && <button onClick={() => deleteRun(run)}>Eliminar? ❌</button>}
            </>
            ) : ''  
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