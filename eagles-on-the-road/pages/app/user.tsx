import { Navbar } from "@/components/NavBar";
import { validateToken } from "@/logic/frontend/fetchJWTToken";
import { fetchUserData } from "@/logic/frontend/fetchUserData";
import { token } from "@/logic/frontend/getToken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';

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
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
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
                const newBlob = await upload(photo.name, photo, {
                access: 'public',
                handleUploadUrl: '/api/v1/photo/userId',
              });
     
              setBlob(newBlob)
        } catch(e){
            console.log(e)
        }
    }
    console.log(blob?.url)
    return(
        <>
            <div className="h-screen flex flex-col justify-between">
                <div className="overflow-hidden w-full flex flex-col items-center gap-5 justify-center mt-9">
                    <img 
                    src={`/images/${userInfo?.photo}`} 
                    className="rounded-[50%] w-[200px] h-[200px]"
                    />
                    <label className="flex flex-col items-center bg-gray-500 rounded-lg text-white w-48 h-6">Trocar fotografica
                    <input
                    className="hidden" 
                    onChange={(e) => setPhoto(e.target.files?.[0])}
                    type="file"/>
                    </label>
                    {photo && <button onClick={() => submit()}>Enviar</button>}
                <div className="flex flex-col gap-4 justify-center items-center text-xl">
                    <p>Nome: {userInfo?.name}</p>
                    <p>Email: {userInfo?.email}</p>
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