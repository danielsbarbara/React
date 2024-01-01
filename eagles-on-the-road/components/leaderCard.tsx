import { useRouter } from "next/navigation"

interface LProps{
    data: any,
    showFields: number
}

interface userInfoType{
    _id: string
}

export function LeaderCard({data, showFields}: LProps){
    const field = showFields === 1 ? 'resutlPratice' : showFields === 2 ? 'resultRuns' : showFields === 3 ? 'allTypes' : ''
    const router = useRouter()

    async function handleClick(userInfo: userInfoType) {
        router.push(`/app/${userInfo._id}`)
    }
    return(
        <div className="flex flex-col items-center gap-4 text-lg"> 
           {field && data && data[field]?.map((el: any, i:number) => 
            <div
            onClick={() => handleClick(el)}
            className={`flex justify-between ${i === 0 ? 'bg-orange-200' : i === 1 ? 'bg-gray-300' : i === 2 ? 'bg-orange-400' : 'bg-white'}
            h-16 w-11/12 rounded-lg p-2`} 
            key={i}>
            <div className="flex gap-3 justify-self-start">
                <p className="text-[1.8rem] self-center">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ''}</p>
                <img src={data?.[field][i].photo.startsWith('http') ? data?.[field][i].photo : `/images/user-default.jpg`} className="self-center h-[50px] w-[50px] rounded-[50%]"/>
            </div>
            <p className="self-center">{el.name}</p>
            <p className="self-end">{el.distance ? el.distance : 0} kms</p>
            </div>
            )} 
        </div>
    )
}
