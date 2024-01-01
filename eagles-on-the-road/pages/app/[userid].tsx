import { Navbar } from "@/components/NavBar"
import { Loading } from "@/components/loading"
import { validateToken } from "@/logic/frontend/fetchJWTToken"
import { fetchUserData } from "@/logic/frontend/fetchUserData"
import { token } from "@/logic/frontend/getToken"
import { fetchRuns } from "@/logic/frontend/run-pratice/fetchUserRuns"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

interface tokenType {
    token: string
}

interface userInfoType {
    name: string,
    photo: string,
}

interface runsType{
    description: string,
    time: string,
    km: number,
    date: string,
    type: string
}

const dataOptions: any = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}

export default function UserInfo(){
    const [userInfo, setUserInfo] = useState<userInfoType>()
    const [runs, setRuns] = useState<Array<runsType>>()

    const router = useRouter()
    
    useEffect(() => {
        const jwt: tokenType | null = token('jwt')

        async function fetchUserInfo() {
            const isValidate = await validateToken(jwt) 
            if(!isValidate) return router.push('/')

            const userId = router.query.userid
            const user = await fetchUserData(userId)
            const userRuns = await fetchRuns(userId)
            setUserInfo(user)
            setRuns(userRuns)
        }
        fetchUserInfo()
    }, [])
    return( 
        <>
        {userInfo ? <div className="flex flex-col justify-between h-screen items-center">
            <img 
                src={userInfo?.photo?.startsWith('http') ? userInfo?.photo : `/images/${userInfo?.photo}`} 
                className="rounded-[50%] w-[200px] h-[200px] mt-2"
                />
                <div className="flex gap-1">
                    <p className="font-title text-red-600 animate-[wiggle_1s_ease-in-out_infinite]">K</p>
                    <p className="font-bold">{userInfo?.name}</p>
                    <p className="font-title text-red-600 animate-[wiggleReverse_1s_ease-in-out_infinite]">k</p>
                </div>
                <div className="w-full flex flex-col items-center gap-3 h-[50%] overflow-scroll">
                {runs?.map((el: runsType) => 
                <div 
                key={Math.random()}
                className="flex justify-between w-[90%] p-1 border-[1px] border-black rounded-lg"
                >   
                    <div className="flex flex-col">
                        <p>{el.description}</p>
                        <p>{new Intl.DateTimeFormat('pt-PT', dataOptions).format(new Date(el.date))}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>{el.time}h</p>
                        <p>{el.km} km</p>
                    </div>
                </div>
                )}
                </div>
            <div className="w-full">
                <Navbar/>
            </div>
        </div>: 
         <Loading/>
        }
        </>
    )
}