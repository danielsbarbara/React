import { selectOptions } from "@/logic/frontend/selectOptions"

interface selectTypes {
    filter: string,
    fetchDateLeader: Function
}

export function SelectLeader({ filter, fetchDateLeader }: selectTypes) {
    const options = selectOptions()
    return (
        <>
            <select className="h-6 border-[1px] border-black rounded-md"
                value={filter} onChange={(e) => fetchDateLeader(e.target.value)}>
                {options.map((el: any, i: number) => 
                    <option key={i} value={el.value}>{el.description}</option>
                    )}
            </select>
        </>
    )
}