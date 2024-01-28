interface propsType {
    precipitaProb: string | undefined
    tMax: number | undefined
    tMin: number | undefined
}

export function Weather({weather}: any){
    return(
        <>
            <p>{+weather?.precipitaProb === 0 ? '☀️' : '🌧️'} {`Máx: ${weather?.tMax}ºC / Min: ${weather.tMin}ºC`}</p>
        </>
    )
}