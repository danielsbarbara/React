import { Navbar } from "@/components/NavBar";
import { Title } from "@/components/Title";
import { Fields } from "@/components/fields";
import { LeaderCard } from "@/components/leaderCard";
import { validateToken } from "@/logic/frontend/fetchJWTToken";
import { token } from "@/logic/frontend/getToken";
import { fetchLeaderBoard } from "@/logic/frontend/leaderboard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface tokenType {
    token: string
}

export default function LeaderBoard(){
    const [data, setData] = useState()
    const [showField, setShowField] = useState(0)
    const router = useRouter()

    useEffect(() => {
        const jwt: tokenType | null = token('jwt')

        async function fetchLeaderBoardData() {
            const validateJWT = await validateToken(jwt)
            if(!validateJWT) return router.push('/')
            const lData = await fetchLeaderBoard()
            setData(lData);
        }
        fetchLeaderBoardData()
    }, [])
    return(
        <div className="h-screen flex flex-col justify-between">
            <div className="text-[2.5rem] text-center">
            <Title title="🏆"/>
            <div className="-translate flex flex-col gap-6">
                <div className="flex gap-4 text-xl">
                    <Fields field="Treinos" value={1} showField={showField} setShowField={setShowField}/>
                    <Fields field="Corridas" value={2} showField={showField} setShowField={setShowField}/>
                    <Fields field="Tudo" value={3} showField={showField} setShowField={setShowField}/>
                </div>
                <LeaderCard data={data} showFields={showField}/>
            </div>
            </div>
            <Navbar/>
        </div>
    )
}