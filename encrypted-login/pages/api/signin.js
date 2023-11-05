import { gettoken } from '@/backendLogic/gettokens'
import { signin } from '@/backendLogic/signin'

export default async (req, res) => {
    const result = await signin(req.body)
    if(result) return res.status(200).json({result: true})
    return res.status(200).json({result: false})
}