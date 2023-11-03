import { GetDataByYear } from "@/database/CRUD";

export async function getTop5ByTime(year, month, field){
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const inputMonth = String(months.reduce((acc, el, i) => el == month ? acc = i : acc  ,0))
    const filteredByYear = await GetDataByYear(year)
    const monthArray = []
    for(let i = 0; i < filteredByYear.length; i++){
        const monthFromData = String(new Date(filteredByYear[i].ts).getMonth())
        if(monthFromData === inputMonth) monthArray.push(filteredByYear[i])
    }

    if(field === 'artist'){

        const map = monthArray.reduce((acc, item) => acc.has(item.master_metadata_album_artist_name) ?
        acc.set(item.master_metadata_album_artist_name, acc.get(item.master_metadata_album_artist_name) + item.ms_played) :
        acc.set(item.master_metadata_album_artist_name, item.ms_played)
        , new Map())
        let toArray = new Array()
        map.forEach((value, key) => toArray = [...toArray, {name: key, counter: Math.round(value / 60000)}])
        const result = toArray.sort((a, b) => b.counter - a.counter).slice(0, 5)
        return result

    } else if(field === 'album'){

        const map = monthArray.reduce((acc, item) => acc.has(item.master_metadata_album_album_name) ?
        acc.set(item.master_metadata_album_album_name, acc.get(item.master_metadata_album_album_name) + item.ms_played) :
        acc.set(item.master_metadata_album_album_name, item.ms_played)
        , new Map())
        let toArray = new Array()
        map.forEach((value, key) => toArray = [...toArray, {name: key, counter: Math.round(value / 60000)}])
        const result = toArray.sort((a, b) => b.counter - a.counter).slice(0, 5)
        return result

    } else if (field === 'track'){
        const map = monthArray.reduce((acc, item) => acc.has(item.master_metadata_track_name) ?
        acc.set(item.master_metadata_track_name, acc.get(item.master_metadata_track_name) + item.ms_played) :
        acc.set(item.master_metadata_track_name, item.ms_played)
        , new Map())
        let toArray = new Array()
        map.forEach((value, key) => toArray = [...toArray, {name: key, counter: Math.round(value / 60000)}])
        const result = toArray.sort((a, b) => b.counter - a.counter).slice(0, 5)
        return result
    }
}