import styles from "./Income.module.css"
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

interface Props {
    description: string,
    setMovements: Function,
    movements: any,
    submitInOutCome: Function
}

interface movObj {
    description: string | undefined,
    amount: string | undefined
}

const initialValues: any = {
    description: '',
    amount: ''
}


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

export function Income({ description, setMovements, movements, submitInOutCome}: Props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        setMovements(initialValues)
    };

    function handleChange(event: string, type: string){
        if (type === "text") return setMovements((prev: movObj) => ({...prev, description: event}))
        setMovements((prev: movObj) => ({...prev, amount: event}))
    }

    return (
        <div className={description === "Income" ? styles.greenContainer : styles.redContainer}>
            <p>{description}</p>
            <Button onClick={handleOpen} className={styles.button}>{description === "Income" ? '+' : '-'}</Button>
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
                        <h4 className={styles.h4}>{description}</h4>

                        <input 
                        value={movements.description}
                        type="text" 
                        onChange={(e) => handleChange(e.target.value, "text")}
                        placeholder="Description" 
                        className={styles.input} />

                        <input 
                        type="number" 
                        onChange={(e) => handleChange(e.target.value, "number")}
                        placeholder="€" 
                        className={styles.input} />

                        <div className={styles.buttonsContainer}>
                            <button className={styles.button} onClick={() => {submitInOutCome(description); handleClose()}}>Submit</button>
                            <button className={styles.button} onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}