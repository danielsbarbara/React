import styles from "./Form.module.css"

export function Form({type, description, info, setInfo}){

    function handleChange(val){
        if(type === 'email') setInfo(prev => ({...prev, email: val}))
        if(type === 'password') setInfo(prev => ({...prev, password: val}))
        if(type === 'name') setInfo(prev => ({...prev, name: val}))
    }
    
    return(
        <div className={styles.container}>
            <input 
            type={type}
            placeholder={description} 
            className={styles.form}
            value={type === 'email' ? info.email : type === 'password' ? info.password : info.name}
            onChange={(e) => handleChange(e.target.value)}    
            />
        </div>
    )
}