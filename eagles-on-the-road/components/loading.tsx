export function Loading(){
    return(
        <div className="h-screen flex items-center justify-center gap-2">
            <p className="text-xl text-red-600 font-title animate-[wiggle_1s_ease-in-out_infinite]">K</p>
            <p className="font-extrabold">LOADING</p>
            <p className="text-xl text-red-600 font-title animate-[wiggleReverse_1s_ease-in-out_infinite]">k</p>
        </div>
    )
}