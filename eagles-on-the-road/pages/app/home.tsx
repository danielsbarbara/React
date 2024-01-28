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
import { Loading } from "@/components/loading"
import { Weather } from "@/components/weather"

interface tokenType {
    token: string
}

interface userDataType {
    name: string | undefined,
    distance: number | undefined,
    practice: Array<any>,
    runs: Array<any>
}

interface impaType {
    longitude: string
    latitude: string
}

export default function Home(){
    const [userData, setUserData] = useState<userDataType>({name: '', distance: undefined, practice:[], runs:[]})
    const [runs, setRuns] = useState()
    const [showRuns, setShowRuns] = useState<number>(0)
    const [showForm, setShowForm] = useState(false)
    const [weather, setWeather] = useState()
    const router = useRouter()
    const notifySuccess = (msg: string) => toast.success(msg);
    const notifyError = (msg: string) => toast.error(msg);

    useEffect(() => {
        const jwt: tokenType | null = token('jwt')
        const userId: tokenType | null = token('userId')

        async function fetchTokenValidation() {
            const isValid = await validateToken(jwt)

            if(!isValid) return router.push('/')

            const userData = await fetchUserData(userId)
            const userRuns = await fetchRuns(userId)

            if(!userData || !userRuns) return notifyError('Aconteceu um erro, recarrega a página!')

            setRuns(userRuns)
            setUserData(userData)
        }

        fetchTokenValidation()
        getWeather()
    }, [])

    async function getWeather() {
        let weather: any
        if (navigator.geolocation) weather = navigator.geolocation.getCurrentPosition( async position => {
            const userLatitude = position.coords.latitude
            const userLongitude = position.coords.longitude
    
            const impaAPI = await fetch('https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/hp-daily-forecast-day0.json')
            if(impaAPI.status === 200) {
                const body = await impaAPI.json()
                setWeather(body.data.reduce((prev: impaType, curr: impaType) => 
                curr.latitude.startsWith(String(userLatitude).slice(0,3)) && curr.longitude.startsWith(String(userLongitude).slice(0,2)) ? prev = curr : prev
                ))
            }
        })
    }
    return(
        <>
            {userData.name ? 
            <>
            <div className="h-screen flex flex-col items-center justify-between">
                <div className="text-[1.5rem]">
                    <Title title={`Bem vindo ${userData.name}`}/>
                </div>
                <div>
                {weather && 
                    <Weather weather={weather}/>
                }</div>
                    {showForm ?   
                    <div className="bg-shoes bg-cover w-5/6 h-64 flex justify-between items-center shadow-2xl rounded-lg">
                    <RunForm/>
                    </div> :                    
                    <KmsCard 
                    km={userData?.distance}
                    pratice={userData?.practice[0]?.totalDistance}
                    runs={userData?.runs[0]?.totalDistance}
                    />
                    }
                <div>
                    <button 
                    className="bg-red-500 text-white w-56 h-8 rounded-b-lg shadow-md drop-shadow-sm"
                    onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancelar' : 'Adicionar Corrida ou Treino'}</button>
                </div>
                <div className="w-full flex justify-around p-3">
                    <Subtitles description="Meus treinos" showRuns={showRuns} setShowRuns={setShowRuns} value={1} />
                    <Subtitles description="Minhas corridas" showRuns={showRuns} setShowRuns={setShowRuns} value={2}/>
                </div>
                <div className="w-full flex justify-center h-[236px] overflow-scroll">
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
                    :
                    <Loading/>
                    }
            </>
    )
}