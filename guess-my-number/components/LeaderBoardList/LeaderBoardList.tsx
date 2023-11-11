import styles from "./LeaderBoardList.module.css"

type Props = {
    leaderBoard: any,
}

export function LeaderBoardList({leaderBoard}: Props){
    
    return(
        <div className={styles.container}>
            {leaderBoard && leaderBoard.map((item: any) => 
            <div className={styles.content} key={Math.random()}>
                <p>{`Name: ${item.name}`}</p>
                <p>{`Score: ${item.score}`}</p>
            </div>)}
        </div>
    )
}