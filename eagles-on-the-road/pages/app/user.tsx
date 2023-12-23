import { Navbar } from "@/components/NavBar";
import { validateToken } from "@/logic/frontend/fetchJWTToken";
import { fetchUserData } from "@/logic/frontend/fetchUserData";
import { token } from "@/logic/frontend/getToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface tokenType {
    token: string
}

interface userInfoType {
    _id: string,
    photo: string,
    name: string, 
    email: string
}

export default function User(){
    const [userInfo, setUserInfo] = useState<userInfoType>()
    const [photo, setPhoto] = useState<File>()
    const notifyError = (msg: string) => toast.error(msg);
    const router = useRouter()

    useEffect(() => {
        const jwt: tokenType | null = token('jwt')
        const userId: tokenType | null = token('userId')
        async function getUserData() {
            const isValidate = await validateToken(jwt)
            if(!isValidate) return router.push('/')
            const userData = await fetchUserData(userId)
            if(!userData) return notifyError('Ocorreu um erro, tenta novamente')
            setUserInfo(userData)
        }
        getUserData()
    }, [])
    
    async function submit(){
        
        if(!photo) return

        try{
            const formData = new FormData()
            formData.append('file', photo)

            const options = {
                method: 'POST',
                body: formData
            }
            
            const res = await fetch(`/api/v1/photo/${userInfo?._id}`, options)

        } catch(e){
            console.log(e)
        }
    }
    return(
        <>
            <div className="h-screen flex flex-col justify-between">
                <div className="overflow-hidden w-full flex flex-col items-center gap-4 justify-center">
                    <img 
                    src={`/images/${userInfo?.photo}`} 
                    className="rounded-[50%] w-[200px] h-[200px]"
                    />
                    <label>Trocar fotografica</label>
                    <input 
                    onChange={(e) => setPhoto(e.target.files?.[0])}
                    type="file"/>
                    <button onClick={() => submit()}>Enviar</button>
                <div>
                    <p>Nome: {userInfo?.name}</p>
                    <p>email: {userInfo?.email}</p>
                </div>
                </div>
                <Navbar/>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
        </>
    )
}