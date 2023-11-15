import styles from "./LogInButtons.module.css"

interface props {
    description: string,
    submit: Function
}

export function LogInButtons({description, submit}: props){
    return(
        <button onClick={() => submit(description)}>{description}</button>
    )
}