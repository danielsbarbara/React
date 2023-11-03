import { getTop5ByTime } from "@/backendLogic/top5byTime"

export default async (req, res) => {
    const {year, month, field} = req.query
    const result = await getTop5ByTime(year, month, field)
    res.status(200).json({result: result})
}