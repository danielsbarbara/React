import { AddResetField } from "@/mongoConnect/CRUD"

const nodemailer = require('nodemailer')

export async function sendEmail(email: string) {
    const recovNr: number = Math.floor(Math.random()*90000) + 10000

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smpt.gmail.com",
        port: 465,
        auth:{
            user: process.env.ADMIN_EMAIL,
            pass: process.env.PW,

        }
    })

    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: `${email}`,
        subject: "Recuperar Password",
        text: `Acede a este link https://eagles-on-the-road.vercel.app/app/resetpw e coloca o teu email e este código para resetares a tua password
        Código: ${String(recovNr)}`
    }

    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if(error) return console.log(error)
        console.log(info.reponse)
    })
    await AddResetField(email, recovNr)

    return
}