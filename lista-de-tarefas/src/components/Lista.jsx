export const Lista = ({lista, editLista, descricao, editDescricao, deleteItem}) => {

    return (
           <div> {
            lista.map(ele => <Tela key={ele.id} conteudo={ele} deleteItem={deleteItem}/>)
            }
        </div>
    )
}

const Tela = ({conteudo, deleteItem, lista}) => {
    return(
        <div className="formulario">
            <h3>{conteudo.descricao}</h3>
            <button onClick={() => deleteItem(conteudo.id)}>❌</button>
        </div>
    )
}