import styles from "./Forms.module.css"

interface props {
    description: string,
    type: string,
    info: any,
    setInfo: Function
}

export function Forms({description, type, info, setInfo}: props){

    function handleChange(event: string, description: string){
        const field: string = description.toLowerCase()

        if(description === "Confirm Password"){
            setInfo((prev: object) => ({...prev, confirmPassword: event}))
        } else {
            setInfo((prev: object) => ({...prev, [field]: event}))
        }
    }

    return(
        <input 
        className={styles.input}
        type={type} 
        placeholder={description} 
        value={info[description === "Confirm Password" ? "confirmPassword" : description.toLowerCase()]}
        onChange={(event) => handleChange(event.target.value, description)}/>
    )
}