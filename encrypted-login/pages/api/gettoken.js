import { gettoken } from "@/backendLogic/gettokens"

export default async (req, res) => {
        const {email} = req.body
        const token = await gettoken(email)
        res.status(200).json({result: token})
}