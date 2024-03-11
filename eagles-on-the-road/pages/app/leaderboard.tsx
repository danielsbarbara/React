import { Navbar } from "@/components/NavBar";
import { Title } from "@/components/Title";
import { Fields } from "@/components/fields";
import { LeaderCard } from "@/components/leaderCard";
import { Loading } from "@/components/loading";
import { SelectLeader } from "@/components/selectLeader";
import { validateToken } from "@/logic/frontend/fetchJWTToken";
import { token } from "@/logic/frontend/getToken";
import { fetchLeaderBoard } from "@/logic/frontend/leaderboardFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface tokenType {
    token: string
}

export default function LeaderBoard() {
    const [data, setData] = useState()
    const [showField, setShowField] = useState(1)
    const [filter, setFilter] = useState('All')
    const router = useRouter()

    useEffect(() => {
        const jwt: tokenType | null = token('jwt')

        async function fetchLeaderBoardData() {
            const validateJWT = await validateToken(jwt)

            if (!validateJWT) return router.push('/')

            const lData = await fetchLeaderBoard(filter)

            setData(lData);
        }

        fetchLeaderBoardData()
    }, [filter])

    function fetchDateLeader(value: any){
        setFilter(value)
    }

    const date = new Date(Date.now()).getFullYear()

    return (
        <div className="h-screen flex flex-col justify-between">
            <div className="text-[2.5rem] text-center">
                <Title title="🏆" />
                <div className="flex flex-col gap-6">
                    <div className="flex gap-4 text-xl">
                        <Fields field="Treinos" value={1} showField={showField} setShowField={setShowField} />
                        <Fields field="Corridas" value={2} showField={showField} setShowField={setShowField} />
                        <Fields field="Tudo" value={3} showField={showField} setShowField={setShowField} />
                    </div>
                    <div className="text-sm">
                        <SelectLeader filter={filter} fetchDateLeader={fetchDateLeader}/>
                    </div>
                    {data
                        ?
                        <LeaderCard data={data} showFields={showField} />
                        :
                        <div className="text-base -translate-y-[200px]">
                            <Loading />
                        </div>
                    }
                </div>
            </div>
            <Navbar />
        </div>
    )
}