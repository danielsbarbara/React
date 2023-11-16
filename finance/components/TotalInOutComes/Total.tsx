import styles from "./Total.module.css"

interface Props {
    description: string
}


export function Total({description}: Props){
    return(
        <p>{`${description}: 1000`}</p>
    )
}