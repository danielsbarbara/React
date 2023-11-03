import { top5 } from "@/backendLogic/top5"

export default async (req, res) => {
    const {field} = req.query
    const result = await top5(field)
    console.log(result)
    res.status(200).json({result: result})
}