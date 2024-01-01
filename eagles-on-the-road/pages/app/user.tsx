import { Navbar } from "@/components/NavBar";
import { validateToken } from "@/logic/frontend/fetchJWTToken";
import { fetchUserData } from "@/logic/frontend/fetchUserData";
import { token } from "@/logic/frontend/getToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { upload } from '@vercel/blob/client';
import { Loading } from "@/components/loading";

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
    const [loading, setLoading] = useState<Boolean>(false)
    const notifyError = (msg: string) => toast.error(msg);
    const notifySuccess = (msg: string) => toast.success(msg);
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
        setLoading(true)
        try{
                const newBlob = await upload(photo.name, photo, {
                access: 'public',
                handleUploadUrl: '/api/v1/photo/upload',
              })

              const options = {
                method: 'POST',
                headers: {'Cotent-Type': 'application/json'},
                body: JSON.stringify({photoURL: newBlob?.url})
              }

              const updatePhoto = await fetch(`/api/v1/photo/${userInfo?._id}`, options)

              if(updatePhoto.status === 200){
                notifySuccess('Fotografia mudada com sucesso!')
                setTimeout(() => {
                    router.reload()
                }, 1500);
                return 
              }
              setLoading(false)
              notifyError('Aconteceu um erro, tenta novamente mais tarde')
            } catch(e){
                setLoading(false)
                console.log(e)
                notifyError('Aconteceu um erro, tenta novamente mais tarde')
        }
    }
    return(
        <>
            {userInfo ? 
            <>
            <div className="h-screen flex flex-col justify-between">
                <div className="overflow-hidden w-full flex flex-col items-center gap-5 justify-center mt-9">
                    <img 
                    src={userInfo?.photo.startsWith('http') ? userInfo?.photo : `/images/${userInfo?.photo}`} 
                    className="rounded-[50%] w-[200px] h-[200px]"
                    />
                    {loading ? 
                    <div className="h-[30px] w-[30px] border-black border-[2px] border-t-white rounded-[50%] animate-spin"/>
                    :
                    <label className="flex flex-col items-center bg-gray-500 rounded-lg text-white w-48 h-6">Trocar fotografia
                    <input
                    className="hidden" 
                    onChange={(e) => setPhoto(e.target.files?.[0])}
                    type="file"/>
                    </label>}
                    {photo && !loading && <button onClick={() => submit()}>Enviar</button>}
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
                : 
                <Loading/>
                }
        </>
    )
}