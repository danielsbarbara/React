import { GetAllData } from "@/database/CRUD";

export async function getyears(){
    const allData = await GetAllData()
    const getYears = allData.reduce((acc, item) => 
    acc.has(item.ts) ? 
    acc : 
    acc.set(new Date(item.ts).getFullYear()), new Map())
    const getallyears = Array.from(getYears.keys())
    return getallyears
}