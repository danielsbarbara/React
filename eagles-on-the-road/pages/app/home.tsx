import { fetchUserData } from "@/logic/frontend/fetchUserData"
import {token} from "../../logic/frontend/getToken"
import { useEffect, useState } from "react"
import { validateToken } from "@/logic/frontend/fetchJWTToken"
import { useRouter } from "next/router"
import { Title } from "@/components/Title"
import { KmsCard } from "@/components/kmsCard"
import { Subtitles } from "@/components/subtitles"
import { fetchRuns } from "@/logic/frontend/run-pratice/fetchUserRuns"
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RunsCard } from "@/components/runsCard"
import { Navbar } from "@/components/NavBar"
import { RunForm } from "@/components/runForm"

interface tokenType {
    token: string
}

interface userDataType {
    name: string | undefined,
    distance: number | undefined,
    practice: Array<any>,
    runs: Array<any>
}

export default function Home(){
    const [userData, setUserData] = useState<userDataType>({name: '', distance: undefined, practice:[], runs:[]})
    const [runs, setRuns] = useState()
    const [showRuns, setShowRuns] = useState<number>(0)
    const [showForm, setShowForm] = useState(false)
    const router = useRouter()
    const notifySuccess = (msg: string) => toast.success(msg);
    const notifyError = (msg: string) => toast.error(msg);

    useEffect(() => {
        const jwt: tokenType | null = token('jwt')
        const userId: tokenType | null = token('userId')

        async function fetchTokenValidation() {
            const isValidate = await validateToken(jwt)
            if(!isValidate) return router.push('/')
            const userData = await fetchUserData(userId)
            const userRuns = await fetchRuns(userId)
            if(!userData || !userRuns) return notifyError('Aconteceu um erro, recarrega a página!')
            setRuns(userRuns)
            setUserData(userData)
        }
        fetchTokenValidation()
    }, [])
    return(
        <>
            <div className="h-screen flex flex-col items-center justify-between">
                <div className="text-[2rem]">
                    <Title title={`Bem vindo ${userData.name}`}/>
                </div>
                    {showForm ?   
                    <div className="bg-shoes bg-cover w-5/6 h-60 flex justify-between items-center shadow-2xl rounded-lg">
                    <RunForm/>
                    </div> :                    
                    <KmsCard 
                    km={userData?.distance}
                    pratice={userData?.practice[0]?.totalDistance}
                    runs={userData?.runs[0]?.totalDistance}
                    />
                    }
                <div>
                    <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancelar' : 'Adicionar Corrida ou Treino'}</button>
                </div>
                <div className="w-full flex justify-around p-3">
                    <Subtitles description="Meus treinos" showRuns={showRuns} setShowRuns={setShowRuns} value={1} />
                    <Subtitles description="Minhas corridas" showRuns={showRuns} setShowRuns={setShowRuns} value={2}/>
                </div>
                <div className="w-full flex justify-center">
                    <RunsCard userRuns={runs} showRuns={showRuns}/>
                </div>
                <div className="w-full">
                    <Navbar/>
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