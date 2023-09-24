export const Footer = ({lista}) => {
    let verdadeiros = 0
    lista.forEach(value => value.concluido && verdadeiros++)

    return (
        <div className="footer">
            <p>{lista.length} tarefas de {verdadeiros} tarefas realizadas!</p>
        </div>
    )
}