import { GetAllData } from "@/database/CRUD";

export async function top5(field) {
    const allfiles = await GetAllData()
    if (field === 'artist') {
        const counter = allfiles.reduce((acc, item) =>
            acc.has(item.master_metadata_album_artist_name) ?
            acc.set(item.master_metadata_album_artist_name, acc.get(item.master_metadata_album_artist_name) + 1) :
            acc.set(item.master_metadata_album_artist_name, 1), new Map())

        let toObj = []
        counter.forEach((value, key) => toObj = [...toObj, { name: key, counter: value }])
        const result = toObj.sort((a, b) => b.counter - a.counter).slice(0, 5)

        return result
    } else if (field === 'album') {
        const counter = allfiles.reduce((acc, item) => 
            acc.has(item.master_metadata_album_album_name) ? 
            acc.set(item.master_metadata_album_album_name, acc.get(item.master_metadata_album_album_name) + 1) : 
            acc.set(item.master_metadata_album_album_name, 1), new Map())

        let toObj = []
        counter.forEach((value, key) => toObj = [...toObj, {name: key, counter: value}])
        const result = toObj.sort((a, b) => b.counter - a.counter).slice(0, 5)

        return result
    } else if(field === 'track'){
        const counter = allfiles.reduce((acc, item) => 
            acc.has(item.master_metadata_track_name) ?
            acc.set(item.master_metadata_track_name, acc.get(item.master_metadata_track_name) + 1) :
            acc.set(item.master_metadata_track_name, 1), new Map())

        let toObj = []
        counter.forEach((value, key) => toObj = [...toObj, {name: key, counter: value}])
        const result = toObj.sort((a, b) => b.counter - a.counter).slice(0, 5)
        console.log(result)
        return result
    }
}