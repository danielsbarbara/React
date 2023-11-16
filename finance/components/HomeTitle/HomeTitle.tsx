import styles from "./HomeTitle.module.css"

interface TitleProps {
    name: string | undefined,
    title: string
}

export function HomeTitle({ name, title }: TitleProps) {
    return (
        <p className={title !== "Welcome," ? styles.balance : styles.title}>{title === "Welcome," ? title : title} {title === "Welcome," ? name : ''}</p>
    )
}