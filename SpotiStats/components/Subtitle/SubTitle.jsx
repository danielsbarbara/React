import styles from "./SubTitle.module.css"

export function Subtitle({subtitle, value, setInfo, info}){

    function handleClick(val){
       setInfo(prev => ({...prev, value: val})) 
    }
    
    return(
        <div> 
            <p 
            value={value}
            onClick={() => handleClick(value)} 
            className={info == value ? 
            styles.highlight : styles.content}>{subtitle}</p>
        </div>
    )
}