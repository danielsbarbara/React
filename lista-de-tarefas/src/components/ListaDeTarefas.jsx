import { Titulo } from './Titulo.jsx'
import { InputTarefas } from './InputTarefas.jsx'
import { Lista } from './Lista.jsx'
import { Footer } from './Footer.jsx'
import { useState } from 'react'


 
export const ListaDeTarefas = () => {
    const [lista, setLista] = useState([])

    const handleAddList = (item) => {
        if(lista.length === 0 ) return setLista([item])

        setLista(prev => [...prev, item])

        console.log(lista)
    }

    const handleDelete = (id) => {
        setLista(lista.filter(ele => ele.id !== id))
        console.log(lista)
    }

    return (
        <div className='main2'>
            <Titulo />
            <InputTarefas lista={lista} editLista={setLista} addItems={handleAddList}/>
            <Lista lista={lista} editLista={setLista} deleteItem={handleDelete}/>
            <Footer lista={lista}/>
        </div>
    )
}