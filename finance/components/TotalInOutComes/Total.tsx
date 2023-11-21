import styles from "./Total.module.css"
import {useState} from "react"

interface Props {
    description: string,
    movs: any
}

interface valobj {
    amount: string
}


export function Total({description, movs}: Props){
    const incomes: number = movs?.reduce((acc: number, val: valobj) => val.amount.includes('-') ? acc : acc += Number(val.amount), 0)
    const outcomes: number = movs?.reduce((acc: number, val: valobj) => !val.amount.includes('-') ? acc : acc += Number(val.amount.replace('-', '')), 0)
    
    return(
        <p>{`${description}: ${description === 'Incomes' ? incomes : outcomes}`}</p>
    )
}