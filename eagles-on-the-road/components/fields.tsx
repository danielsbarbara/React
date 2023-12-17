interface FieldsType {
    field: string,
    value: number,
    showField: number,
    setShowField: Function
}

export function Fields({field, value, showField, setShowField}: FieldsType){
    function changeView(field: string){
        if(field === 'Treinos') return setShowField(1)
        if(field === 'Corridas') return setShowField(2)
        setShowField(3)
    }

    return(
        <div 
        className={`${showField === value ? 'bg-red-500' : ''} rounded-xl w-36 text-center h-7 flex items-center justify-center transition duration-500`}
        onClick={() => changeView(field)}>
            <p>{field}</p>
        </div>
    )
}