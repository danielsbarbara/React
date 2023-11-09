import styles from "./Forms.module.css"

type TypeProps = {
    type: string,
    placeholder: string,
    setInfo: any,
    info: any
}

export function Forms({type, placeholder, setInfo, info}: TypeProps){

    function handleChange(event: React.ChangeEvent<HTMLInputElement>){
        setInfo((prev: object) => ({...prev, [type]: event.target.value}))
    }
    
    return(
        <div className={styles.container}>
            <input 
            type={type} 
            placeholder={placeholder} 
            className={styles.input}
            value={info[type]}
            onChange={handleChange}
            />
        </div>
    )
}