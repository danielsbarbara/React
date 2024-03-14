import { Navbar } from "@/components/NavBar"
import { Title } from "@/components/Title"
import { Loading } from "@/components/loading"
import { validateToken } from "@/logic/frontend/fetchJWTToken"
import { token } from "@/logic/frontend/getToken"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface tokenType {
    token: string
}

const initial = {
    photo: '',
    name: '',
    avgKm: '',
    date: '',
    runType: '',
    time: '',
    totalKm: 0
}

const dataOptions: any = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}

interface runType {
    photo: string
    name: string
    avgKm: string
    date: string
    runType: string
    time: string
    totalKm: number
}

export default function Statistics() {
    const [run, setRun] = useState<runType>(initial)
    const router = useRouter()

    useEffect(() => {
        const jwt: tokenType | null = token('jwt')

        async function fetchUserInfo() {
            const isValidate = await validateToken(jwt)
            if (!isValidate) return router.push('/')

            const query = router.query.statistics
            if (query) {

                const option = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
                const fetchRun = await fetch(`/api/v1/runs-pratice/info/${query}`, option)
                if (fetchRun.status === 200) {
                    const body = await fetchRun.json()
                    setRun(body.result)
                }
            }

        }
        fetchUserInfo()
    }, [])
    return (
        <>
            {run.name !== '' ? <div className="flex flex-col justify-between h-screen">
                <div className="flex flex-col items-center mt-10">
                    <div className="bg-black/40 h-7 w-7 ml-3 mt-3 flex justify-center items-center rounded-full self-start"
                        onClick={() => router.push(`/app/leaderboard`)}
                    >
                        <div className="h-3 w-3 border-l-[2px] border-b-[2px] border-black rotate-45" />
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <img src={run?.photo} className="h-56 rounded-xl" />
                        <div className="flex gap-2 mt-3 text-lg">
                            <p className="font-title text-red-600 animate-[wiggle_1s_ease-in-out_infinite]">K</p>
                            <Title title={run.name} />
                            <p className="font-title text-red-600 animate-[wiggleReverse_1s_ease-in-out_infinite]">k</p>
                        </div>
                        <p><strong>Tipo:</strong> {run.runType === 'practice' ? 'Treino' : 'Corrida'}</p>
                        <p><strong>Data:</strong> {new Intl.DateTimeFormat('pt-PT', dataOptions).format(new Date(run.date))}</p>
                        <p><strong>Total de kms:</strong> {run.totalKm} kms</p>
                        <div className="flex gap-3">
                            <p><strong>Média:</strong> {run.avgKm}</p>
                            <p><strong>Tempo:</strong> {run.time} h</p>
                        </div>
                    </div>
                </div>
                <Navbar />
            </div> : <Loading />}
        </>
    )
}