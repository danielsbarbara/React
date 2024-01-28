interface impaType {
    longitude: string
    latitude: string
}

export async function getWeather() {
    let weather: any
    if (navigator.geolocation) weather = navigator.geolocation.getCurrentPosition( async position => {
        const userLatitude = position.coords.latitude
        const userLongitude = position.coords.longitude

        console.log("Current Position:", userLatitude, userLongitude)

        const impaAPI = await fetch('https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/hp-daily-forecast-day0.json')
        if(impaAPI.status === 200) {
            const body = await impaAPI.json()
            return body.data.reduce((prev: impaType, curr: impaType) => 
            curr.latitude.startsWith(String(userLatitude).slice(0,3)) && curr.longitude.startsWith(String(userLongitude).slice(0,2)) ? prev = curr : prev
            )
        }
    })
}