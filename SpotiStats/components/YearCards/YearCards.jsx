import styles from "./YearCards.module.css"

export function YearCards({years, setInfo, info}){

    function handleClick(val){
        setInfo(prev => ({...prev, year: val}))
    }

    return(
        <div className={styles.container}>
            {years?.map((year, i) => 
            <div 
            key={i}
            onClick={() => handleClick(year)}
            className={info === year ? styles.highlight : styles.content}
            >
            {year}
            </div>)}
        </div>
    )
}