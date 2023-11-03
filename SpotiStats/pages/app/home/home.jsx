import { InfoCard } from "@/components/InfoCard/InfoCard";
import { NavBar } from "@/components/NavBar/NavBar";
import { Select } from "@/components/Select/Select";
import { Subtitle } from "@/components/Subtitle/SubTitle";
import { Tittle } from "@/components/Title/Title";
import { YearCards } from "@/components/YearCards/YearCards";
import { fetchToGetYears } from "@/pages/logic/fetchToGetYears";
import styles from "./home.module.css"
import { useEffect, useState } from "react";
import { fetchTop5 } from "@/pages/logic/fetchTop5";

export function Application() {
    const [years, setYears] = useState()
    const [data, setDate] = useState()
    const [info, setInfo] = useState({ select: 'artist', year: 2023, value: 1 })


    useEffect(() => {
        async function getYears() {
            const result = await fetchToGetYears()
            setYears(result.result)
        }
        if (info.value === 1) {
            async function getData() {
                const result = await fetchTop5(info.value, info.select)
                setDate(result)
            }
            getData()
        }
        if (info.value === 2) {
            async function getData() {
                const result = await fetchTop5(info.value, info.select, info.year)
                setDate(result)
            }
            getData()
        }
        getYears()
    }, [info])
    
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img src="/pngegg.png" height="70rem" />
                <Tittle title="SpotiStats" />
            </div>
            <div className={styles.selectors}>
                <Subtitle
                    subtitle='Top5 de sempre'
                    value={1}
                    info={info.value}
                    setInfo={setInfo}
                />
                <Select info={info} setInfo={setInfo} />
                <Subtitle
                    subtitle='Top5 por ano'
                    value={2}
                    info={info.value}
                    setInfo={setInfo}
                />
            </div>
            <div className={styles.yearsContainer}>
                {info.value === 2  && <YearCards 
                years={years} 
                info={info.year}
                setInfo={setInfo} />}
            </div>
            <div className={styles.infoCard}>
                <InfoCard data={data} />
            </div>
            <div className={styles.navbar}>
                <NavBar />
            </div>
        </div>
    )
}