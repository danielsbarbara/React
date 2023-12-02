import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { token } from '@/logic/frontend/login/getToken'
import { HomeTitle } from '@/components/HomeTitle/HomeTitle'
import { DateText } from '@/components/Date/Date'
import { LogoutButton } from '@/components/LogoutButton/LogoutButton'
import { Balance } from '@/components/Balance/Balance'
import { Movements } from '@/components/Movements/Movements'
import { Income } from '@/components/IncomeContainer/Income'
import { Total } from '@/components/TotalInOutComes/Total'
import { Navbar } from '@/components/Navbar/Navbar'
import { setInOutCome } from '@/logic/frontend/homepage/setInOutcome'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAllMov } from '@/logic/frontend/homepage/getAllmov'

interface User {
    name: string,
    token: string
}

interface movObj {
    description: string | undefined,
    amount: string | undefined
}


const mov: movObj = {
    description: '',
    amount: ''
}

interface balProps {
    balance: Array<balObje>,
}

interface balObje {
    amount: string
}


export default function Home() {
    const [totalAcc, setTotalAcc] = useState<Array<any>>([])
    const [movements, setMovements] = useState<movObj>(mov)
    const [userName, setUserName] = useState<string | undefined>()
    const router = useRouter()
    const notifyS = (msg: string) => toast.success(msg)
    const notifyE = (msg: string) => toast.error(msg)

    useEffect(() => {
        const user: User | null = token()
        if (user === null) router.push('/')
        setUserName(user?.name)
        async function fetchTotalMov() {
            const movs: Array<balProps> = await getAllMov(user?.token)
            setTotalAcc(movs)
        }
        fetchTotalMov()
    }, [])

    async function submitInOutCome(description: string) {
        if(!movements.description) return notifyE("Add some description")
        if(!movements.amount) return notifyE("Add some amount")
        
        const result: any = await setInOutCome(movements, description)
        if(result){
            notifyS("Success!")
            setTimeout(() => router.reload(), 2000)
        } else {
            return notifyE("Something went wrong!")
        }
        
    }   

    return (
        <div className={styles.page}>
            <div className={styles.test}></div>
            <div className={styles.header}>
                <HomeTitle name={userName} title="Welcome," />
                {/* Logo */}
                <LogoutButton />
            </div>
                <div className={styles.dateContainer}>
                    <DateText />
                </div>
            <div className={styles.balance}>
                <HomeTitle name={userName} title="Current balance" />
                <Balance balance={totalAcc}/>
            </div>
            <div className={styles.movInOut}>
                <div className={styles.inout}>
                    <Income 
                    description='Income' 
                    setMovements={setMovements} 
                    movements={movements}
                    submitInOutCome={submitInOutCome}
                    />
                    <Income 
                    description='Outcome' 
                    setMovements={setMovements} 
                    movements={movements}
                    submitInOutCome={submitInOutCome}
                    />
                </div>
                <div className={styles.mov}>
                    <Movements mov={totalAcc}/>
                </div>
            </div>
            <div className={styles.total}>
                <Total description='Incomes' movs={totalAcc}/>
                <Total description='Outcomes' movs={totalAcc}/>
            </div>
            <div className={styles.navbar}>
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