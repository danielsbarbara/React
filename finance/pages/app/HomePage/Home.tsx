import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { token } from '@/logic/frontend/login/getToken'
import { Titlelogin } from '@/components/TitleLogin/Titlelogin'
import { HomeTitle } from '@/components/HomeTitle/HomeTitle'
import { DateText } from '@/components/Date/Date'
import { LogoutButton } from '@/components/LogoutButton/LogoutButton'
import { Balance } from '@/components/Balance/Balance'
import { Movements } from '@/components/Movements/Movements'
import { Income } from '@/components/IncomeContainer/Income'
import { Total } from '@/components/TotalInOutComes/Total'
import { Navbar } from '@/components/Navbar/Navbar'

interface User {
    name: string,
    token: string
}

export default function Home() {
    const [userName, setUserName] = useState<string | undefined>()
    const router = useRouter()

    useEffect(() => {
        const user: User | null = token()
        if (user === null) router.push('/')
        setUserName(user?.name)
    })

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <HomeTitle name={userName} title="Welcome," />
                {/* Logo */}
                <DateText />
                <LogoutButton />
            </div>
            <div className={styles.balance}>
                <HomeTitle name={userName} title="Current balance" />
                <Balance />
            </div>
            <div className={styles.movInOut}>
                <div className={styles.mov}>
                    <Movements />
                </div>
                <div className={styles.inout}>
                    <Income description='Income' />
                    <Income description='Outcome' />
                </div>
            </div>
            <div className={styles.total}>
                <Total description='Incomes' />
                <Total description='Outcomes' />
            </div>
            <div className={styles.navbar}>
                <Navbar />
            </div>
        </div>
    )
}