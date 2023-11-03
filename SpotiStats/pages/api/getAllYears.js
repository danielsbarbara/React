import { getyears } from "@/backendLogic/getyears"

export default async (req, res) => {
    const result = await getyears()
    res.status(200).json({result: result})
}