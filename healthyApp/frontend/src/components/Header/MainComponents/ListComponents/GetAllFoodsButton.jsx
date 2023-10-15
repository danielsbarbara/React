import styles from "./GetAllFoodsButton.module.css"

export function GetAllFoodsButton({ setItems }) {

    function handleclick(){

        async function fetchData(){
            const res = await fetch('/api/all/products')
            if(res.status === 200){ 
                const body = await res.json()
                setItems(body.result)
            }
        }

        fetchData()
    }

    return (
        <div>
            <button
                className={styles.button}
                onClick={handleclick}
            >Vê os alimentos!</button>
        </div>
    )
}