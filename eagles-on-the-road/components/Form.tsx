
interface FormProps{
    type: string,
    description: string,
    setInfo: Function,
    getInfo: GetInfoType
}

interface GetInfoType {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

export function Form({type, description, setInfo, getInfo}: FormProps){

    function setInfoToState(event: any, description: string){
        let field: string = ''
        if(description === 'Nome') field = 'name'
        if(description === '@email') field = 'email'
        if(description === '***Password***') field = 'password'
        if(description === 'Confirmar Password') field = 'confirmPassword'
        setInfo((prev: Object) => ({...prev, [field]: event}))
    }
    return(
        <>
            <input
            className="text-black text-center h-8 w-60 rounded-md text-[1rem]"
            value={description === 'Nome' ? getInfo.name : description === '@email' ? getInfo.email : description === '***Password***' ? getInfo.password : getInfo.confirmPassword}
            type={type} 
            placeholder={description} 
            onChange={(e) => setInfoToState(e.target.value, description)}/>
        </>
    )
}