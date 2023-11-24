import { Navbar } from "@/components/Navbar/Navbar"
import styles from "./Target.module.css"
import { TargetCards } from "@/components/TargetCards/TargetCards"
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { token } from "@/logic/frontend/login/getToken";
import { useRouter } from "next/router";
import { getAllMov } from "@/logic/frontend/homepage/getAllmov";
import { fetchAllTargets } from "@/logic/frontend/targetPage/fetchAllTargets";
import { setNewTarget } from "@/logic/frontend/targetPage/setNewTarget";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import App from "@/pages/_app";
import { deleteTarget } from "@/logic/frontend/targetPage/deleteTarget";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 250,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

interface User {
    name: string,
    token: string
}

interface balProps {
    balance: Array<object>,
}


interface InfoType {
    description: string | undefined
    valTarget: string | undefined
}

export default function Target() {
    const [inputInfo, setInputInfo] = React.useState<InfoType>({ description: '', valTarget: '' })
    const [balance, setBalance] = React.useState<any>()
    const [targets, setTargets] = React.useState()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)
    const router = useRouter()
    const notifyS = (msg: string) => toast.success(msg)
    const notifyE = (msg: string) => toast.error(msg)

    React.useEffect(() => {
        const user: User | null = token()
        if (user === null) router.push('/')

        async function fetchTotalMov() {
            const movs: Array<balProps> = await getAllMov(user?.token)
            setBalance(movs)
        }

        async function fetchTargets() {
            const targets = await fetchAllTargets(user?.token)
            setTargets(targets)
        }
        fetchTotalMov()
        fetchTargets()

    }, [])

    function handleChange(event: string, description: string) {
        if (description === 'value') return setInputInfo((prev: InfoType) => ({ ...prev, valTarget: event }))
        return setInputInfo((prev: InfoType) => ({ ...prev, description: event }))
    }
    async function handleSubmit() {
        const user: User | null = token()
        const result: any = await setNewTarget(inputInfo, user?.token)
        if (typeof result === 'string') {
            return notifyE(result)
        }
        if (!result) return notifyE('Something went wrong, try again')
        setOpen(false)
        notifyS('Sucessfull')
        setTimeout(() => router.reload(), 2000)
    }
    async function deleteUserTarget(description: string) {
        const result = await deleteTarget(description)
        if(typeof result === "string") return notifyE(result)
        router.reload()
    }
    return (
        <div className={styles.page}>

            <h1>Targets</h1>
            <button onClick={handleOpen} className={styles.button}>+</button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Box sx={style}>
                    <div className={styles.modalBox}>
                        <h4 className={styles.h4}></h4>
                        <input
                            value={inputInfo.description}
                            type="text"
                            placeholder="Description"
                            className={styles.input}
                            onChange={(e) => handleChange(e.target.value, 'description')}
                        />


                        <input
                            value={inputInfo.valTarget}
                            type="number"
                            placeholder="Target value €"
                            className={styles.input}
                            onChange={(e) => handleChange(e.target.value, 'value')}
                        />


                        <div className={styles.buttonsContainer}>
                            <button className={styles.button} onClick={handleSubmit}>Submit</button>
                            <button className={styles.button} onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </Box>
            </Modal>
            <TargetCards targets={targets} balance={balance} deleteUserTarget={deleteUserTarget}/>
            <div className={styles.navbarDiv}>
                <Navbar />
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}