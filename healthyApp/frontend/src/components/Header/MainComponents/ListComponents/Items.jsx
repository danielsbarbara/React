import styles from "./Items.module.css"

export function Items({items}){
    return (
        <div className={styles.container}>
            {Array.isArray(items) ? items.map((item, id) => 
            <div key={Math.random()}>
            <p className={styles.description}>{item.alimento}{item.calorias}calorias</p>
            </div>) : <h3 className={styles.warningh3}>{items}</h3>}
        </div>
    )
}