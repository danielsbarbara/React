import { InfoCard } from "@/components/InfoCard/InfoCard";
import { Select } from "@/components/Select/Select";
import { Subtitle } from "@/components/Subtitle/SubTitle";
import { Tittle } from "@/components/Title/Title";
import { YearCards } from "@/components/YearCards/YearCards";
import styles from "./User.module.css"
import { useEffect, useState } from "react";
import { fetchToGetYears } from "@/pages/logic/fetchToGetYears";
import { Months } from "@/components/Months/Months";
import { fetchForMin } from "@/pages/logic/fetchForMin";
import { NavBar } from "@/components/NavBar/NavBar";
import { useRouter } from "next/navigation";

export default function User(){
    const [years, setYears] = useState()
    const [data, setDate] = useState()
    const [info, setInfo] = useState({ select: 'artist', year: 2023, month: 'Janeiro', value: 1 })
    const router = useRouter()

    useEffect(() => {
       async function fetchYears(){
           const getYears = await fetchToGetYears()
           const getMin = await fetchForMin(info)
           setYears(getYears.result)
           setDate(getMin.result)
       } 
       fetchYears()
    }, [info])

    function changeToHomePage(){
        router.push('/')
    }

    return (    
        <div className={styles.container}>
            <div className={styles.header}>
                <img src="/pngegg.png" height="70rem" />
                <Tittle title="Por minutos"/>
            <p onClick={changeToHomePage} className={styles.backbutton}>🔙</p>
            </div>
            <div className={styles.selectors}>
                <Subtitle subtitle="Top5 por minutos"/>
                <Select info={info} setInfo={setInfo}/>
            </div>
            <div className={styles.yearsContainer}>
                <Months info={info.month} setInfo={setInfo}/>
                <div className={styles.yearCards}>
                    <YearCards
                    years={years}
                    info={info.year}
                    setInfo={setInfo}/>
                </div>
            </div>
            <div className={styles.infoContainer}>
                <InfoCard data={data} page={"minutes"}/>
            </div>
        </div>
    )
}