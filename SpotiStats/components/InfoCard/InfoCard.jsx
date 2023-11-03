import styles from "./InfoCard.module.css"

export function InfoCard({data, page}){
    return(
        <div className={styles.container}>
            {data?.map((item, i) => 
            <div className={styles.content} key={i}>
                <h4>{item.name}</h4>
                <p>{page === "minutes" ?`${item.counter} minutos` : `${item.counter} plays`}</p>
            </div>)}
            
        </div>
    )
}