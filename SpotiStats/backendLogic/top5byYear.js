import { GetAllData, GetDataByYear } from "@/database/CRUD"

export async function top5Year(year, field) {
    const filteredYear = await GetDataByYear(year)
    if (field === 'artist') {

        const map = filteredYear.reduce((acc, item) => acc.has(item.master_metadata_album_artist_name) ?
            acc.set(item.master_metadata_album_artist_name, acc.get(item.master_metadata_album_artist_name) + 1) :
            acc.set(item.master_metadata_album_artist_name, 1)
            , new Map())
        let toarray = new Array()
        map.forEach((value, key) => toarray = [...toarray, { name: key, counter: value }])

        return toarray.sort((a, b) => b.counter - a.counter).slice(0, 5)

    } else if (field === 'album') {
        const map = filteredYear.reduce((acc, item) => acc.has(item.master_metadata_album_album_name) ?
            acc.set(item.master_metadata_album_album_name, acc.get(item.master_metadata_album_album_name) + 1) :
            acc.set(item.master_metadata_album_album_name, 1)
            , new Map())
        let toarray = new Array()
        map.forEach((value, key) => toarray = [...toarray, { name: key, counter: value }])

        return toarray.sort((a, b) => b.counter - a.counter).slice(0, 5)

    } else if (field === 'track') {
        
        const map = filteredYear.reduce((acc, item) => acc.has(item.master_metadata_track_name) ?
            acc.set(item.master_metadata_track_name, acc.get(item.master_metadata_track_name) + 1) :
            acc.set(item.master_metadata_track_name, 1)
            , new Map())
        let toarray = new Array()
        map.forEach((value, key) => toarray = [...toarray, { name: key, counter: value }])

        return toarray.sort((a, b) => b.counter - a.counter).slice(0, 5)
    }
}

