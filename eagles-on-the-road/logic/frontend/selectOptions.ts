import options from "./../../options.json"

interface arrayType {
    value: string,
    description: string
}

const optionsSelect = options as Array<arrayType>
const arrayMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export function selectOptions(){
    const year: number = new Date(Date.now()).getFullYear()
    let month: number = new Date(Date.now()).getMonth()

    const valueOption: string = `${year}-${month < 10 ? `0${month + 1}` : month + 1}`
    const phraseOption: string = `${arrayMonths[month]} ${year}`

    if(optionsSelect[optionsSelect.length - 1].value !== valueOption){
        optionsSelect.push({value: valueOption, description: phraseOption})
        saveData(optionsSelect) 
    } 

    return optionsSelect
}

async function saveData(data: Array<arrayType>){
        const updatedData = {
            method: 'POST',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }
        const result = await fetch('/api/v1/newDateSelect', updatedData)

        return result.status === 200 ? console.log('SelectOptions Updated') : console.log('Error')
}