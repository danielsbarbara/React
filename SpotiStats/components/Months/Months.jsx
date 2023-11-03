import styles from "./Months.module.css"

export function Months({info, setInfo}){
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    function handleClick(val){
        setInfo(prev => ({...prev, month: val}))
    }
    return(
        <div className={styles.mainMonths}>
            {months.map((month, i) => 
            <div key={i} className={info === month ? styles.monthContainer : styles.normalMonth}>
                <p onClick={() => handleClick(month)}>{month}</p>
            </div>)}
        </div>
    )
}