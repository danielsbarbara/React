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
        className="rounded-xl w-56 text-center h-7 flex items-center justify-center transition duration-500 cursor-pointer" 
        onClick={() => changeValue(description)}>
            {value === showRuns ? <p className="font-title transition-opacity animate-pulse">K</p> : ''}
            <p>{description}</p>
            {value === showRuns ? <p className="font-title transition-opacity animate-pulse">k</p> : ''}
        </div>
    )
}