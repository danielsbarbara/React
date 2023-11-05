import { GetUser } from "@/database/CRUD"
const bcrypt = require('bcrypt')

export default async (req, res) => {
    const user = await GetUser(req.body.email)
    const pwDb = user.password
    bcrypt.compare(req.body.password, pwDb, function(err, result){
        if (result) return res.status(200).json({ result: true })
        return res.status(401).json({ result: false})
    })
}