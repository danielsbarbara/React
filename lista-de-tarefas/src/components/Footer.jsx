export const Footer = ({ lista }) => {
    let verdadeiros = lista.reduce((acc, ele) => ele.concluido ? acc += 1 : acc, 0)

    return (
        <div className="footer">
            <p>{lista.length} tarefas de {verdadeiros} tarefas realizadas!</p>
        </div>
    )
}