interface SubtitlesProps{
    description: string,
    setShowRuns: Function,
    showRuns: number,
    value: number
}

export function Subtitles({description, showRuns, setShowRuns, value}: SubtitlesProps){
    function changeValue(description: string){
        if(description === 'Minhas corridas') return setShowRuns(2)
        setShowRuns(1)
    }
    return(
        <div
        className={`${value === showRuns ? 'bg-red-500' : ''} rounded-xl w-36 text-center h-7 flex items-center justify-center transition duration-500 cursor-pointer`} 
        onClick={() => changeValue(description)}>
            <p>{description}</p>
        </div>
    )
}