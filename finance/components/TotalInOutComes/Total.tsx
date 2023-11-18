import styles from "./Total.module.css"
import {useState} from "react"

interface Props {
    description: string,
    movs: any
}


export function Total({description, movs}: Props){
    const [inc, setInc] = useState()
    const [outc, setOutc] = useState()
    const incomes: number = movs?.reduce((acc, val) => val.amount.includes('-') ? acc : acc += Number(val.amount), 0)
    const outcomes: number = movs?.reduce((acc, val) => !val.amount.includes('-') ? acc : acc += Number(val.amount.replace('-', '')), 0)
    
    return(
        <p>{`${description}: ${description === 'Incomes' ? incomes : outcomes}`}</p>
    )
}