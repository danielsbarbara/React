import { useState } from "react"

export const InputTarefas = ({ lista, addItems }) => {
    const [descricao, setDescricao] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const newLista = {
            ...lista, 
            descricao, 
            concluido: false, 
            id: Math.random()
        }

        addItems(newLista)
        setDescricao('')
    }

    return (
        <div className="input">
            <p>Escreve uma lista de compras, ou tarefas que tenhas de realizar!</p>
            <form onSubmit={handleSubmit}>
                <input
                    className="inputText" 
                    type="text"
                    placeholder="tarefa"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                />
                <button type="submit">Submeter</button>
            </form>
        </div>

    )
}