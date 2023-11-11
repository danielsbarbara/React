import styles from "./inputNumber.module.css"

type NumProps = {
    inputNum: number | string,
    setInputNum: Function,
    randomNum: number,
    check: Function,
    userNum: number
}

export function InputNumber({ inputNum, setInputNum, randomNum, check, userNum }: NumProps) {

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const number: number = Number(event.target.value)
        setInputNum(number)
    }

    return (
      
            <div className={styles.all}>
                <div className={styles.container}>
                    <input
                        type="number"
                        placeholder="0"
                        className={styles.input}
                        value={inputNum}
                        onChange={(event) => handleChange(event)}
                        onKeyDown={(event) => check(inputNum, randomNum, event )}
                    />
                </div>
                <button
                    onClick={(event) => check(inputNum, randomNum,event, "CHECK")}
                    disabled={userNum === randomNum ? true : false}
                    className={styles.buttonCheck}
                >CHECK!</button>
            </div>
      
    )
}