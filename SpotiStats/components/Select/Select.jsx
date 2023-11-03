import styles from "./Select.module.css"

export function Select({info, setInfo}){

    function handleChange(val){
        setInfo(prev => ({...prev, select: val}))
    }
    
    return(
        <div>
            <select 
            value={info.select} 
            onChange={(e) => handleChange(e.target.value)}
            className={styles.selectStyles}
            >
                <option value="artist">Artista</option>
                <option value="album">Album</option>
                <option value="track">Música</option>
            </select>
        </div>
    )
}