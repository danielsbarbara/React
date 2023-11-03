import { top5Year } from "@/backendLogic/top5byYear"

export default async (req, res) => {
        const {year, field} = req.query
        console.log(req.query)
        const result = await top5Year(year, field)
        res.status(200).json({result: result})
}