import { useState } from "react"
import styles from "./AddOneFood.module.css"

export function AddOneFood({setItems}){
    const [showInput, setShow] = useState(false)
    const [newFruit, setNewFruit] = useState(
    {
        genero: '',
        alimento: '',
        calorias: ''
    })

    function handleSubmit(e){
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.2.0'},
            body: JSON.stringify({genero: newFruit.genero , alimento: newFruit.alimento , calorias: newFruit.calorias})
          };
          
          fetch('/api/add/product', options)
            .then(response => response.json())
            .then(response => setItems(response.result))
            .catch(err => console.error(err));
        setNewFruit(
        {genero: '',
        alimento: '',
        calorias: ''})
    }
    return(
        <div className={styles.containerAdd}>
            <button 
            onClick={() =>setShow(!showInput)}
            className={styles.button}
            >Adiciona um alimento</button>
            {showInput && <div className={styles.containerInputs}>
                <form onSubmit={handleSubmit} className={styles.containerInputs}>
                    <input
                    className={styles.genero}
                    type="text"
                    placeholder="Genero ex: 'fruta', 'vegetal'"
                    value={newFruit.genero}
                    onChange={(e) => setNewFruit(pFruit => ({...pFruit, genero: e.target.value}))}
                    />
                    <input
                    className={styles.alimento}
                    type="text"
                    placeholder="Nome do alimento"
                    value={newFruit.alimento}
                    onChange={(e) => setNewFruit(pFruit => ({...pFruit, alimento: e.target.value}))}
                    />
                    <input
                    className={styles.calorias}
                    type="text"
                    placeholder="calorias"
                    value={newFruit.calorias}
                    onChange={(e) => setNewFruit(pFruit => ({...pFruit, calorias: e.target.value}))}    
                    />
                    <button className={styles.submitButton} type="submit" disabled = {((newFruit.genero !== '' && newFruit.alimento !== '' && newFruit.calorias !== '') ? false : true)}>Submeter</button>
                </form>
            </div>}
        </div>
    )
}