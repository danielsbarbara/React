import { token } from "../login/getToken"

interface movType {
    description: string | undefined,
    amount: string | undefined
}

interface User {
    name: string,
    token: string
}


export async function setInOutCome(movements: movType, description: string){

    const usertoken: User | null = token() 

    const formatDate: any = {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    }
    
    const now: Date = new Date()
    const date: string = new Intl.DateTimeFormat("pt-PT", formatDate).format(now)

        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.4.2'},
            body: JSON.stringify(
                {
                    token: usertoken?.token, 
                    date: date, 
                    description: movements.description,
                    amount: description === 'Outcome' ? `-${movements.amount}` : movements.amount
                })
            }
            const res = await fetch('../../api/v1/user/account/incomeOutcome', options)
            if(res.status === 200){
                const body = await res.json()
                return body.result
            }    
    return false
}   