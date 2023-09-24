export const Lista = ({ lista, deleteItem, changeConcluido, checkConcluido }) => {

    return (
        <div> {
            lista.map((ele,id) => <Tela key={id} conteudo={ele} deleteItem={deleteItem} checkConcluido={checkConcluido} lista={lista}/>)
        }
        </div>
    )
}

const Tela = ({ conteudo, deleteItem, checkConcluido}) => {


    return (
        <div className="formulario">
            <input type="checkbox" value={conteudo.concluido} onChangeCapture={() => checkConcluido(conteudo.id)} />
            <h3 className={conteudo.concluido ? 'check' : ''}>{conteudo.descricao}</h3>
            <button onClick={() => deleteItem(conteudo.id)}>❌</button>
        </div>
    )
}