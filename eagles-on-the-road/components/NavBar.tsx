import { useRouter } from "next/navigation"

export function Navbar(){
    const router = useRouter()
    function logOut(){
        localStorage.removeItem('jwt')
        localStorage.removeItem('userId')
        router.push('/')
    }
    return(
        <div className="flex justify-between border-t-[1px] border-black p-2">
            <button onClick={() => router.push('/app/user')}><img src="/images/user.png" className="w-[40px] h-[40px]"/></button>
            <button onClick={() => router.push('/app/home')}><img src="/images/home.png" className="w-[40px] h-[40px]"/></button>
            <button onClick={() => router.push('/app/leaderboard')}><img src="/images/bar-chart.png" className="w-[40px] h-[40px]"/></button>
            <button onClick={() => logOut()}><img src="/images/power.png" className="w-[40px] h-[40px]"/></button>
        </div>
    )
}