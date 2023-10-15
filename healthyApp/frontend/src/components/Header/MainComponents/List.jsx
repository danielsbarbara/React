import { useState } from "react"
import { GetAllFoodsButton } from "./ListComponents/GetAllFoodsButton"
import { AddOneFood } from "./ListComponents/AddOneFood"
import { Items } from "./ListComponents/Items"
import styles from "./List.module.css"

export function List(){
    const [items, setItems] = useState()
    return(
        <div className={styles.container}>
            <div className={styles.buttons}>
                <GetAllFoodsButton setItems={setItems}/>
                <AddOneFood setItems={setItems}/>
            </div>
            <div className={styles.items}>
                <Items items={items}/>
            </div>
            
        </div>
    )
}