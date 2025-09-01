import React, { useState,useEffect } from 'react';
import { Button, Snackbar, Modal, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import apiClient from '../../../utils/apiClient';

export default function NewBuyButton({ stock }) {

    const [qty, setQty] = useState('')
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    let [message, setMessage] = useState("Place a valid Order");
    let [errorType, setErrorType] = useState('success')
    const [currentFunds,setCurrentFunds] = useState(0);

    async function executeBuyOrdder(stock){
        //Insert into order db
        let orderData = {
            orderType: "BUY",
            stockName: stock.stockSymbol,
            qty: parseFloat(qty),
            AveragePrice: stock.randomNumber
        }
        let postResult = await apiClient.post("/placeBuyOrder", orderData);
    }




    useEffect(()=>{
        async function getCurrentFunds() {
            let funds =  await apiClient.get("/getFunds");
            setCurrentFunds(funds.data.fundsAvilable);
        }
        getCurrentFunds();
    })


    let handleQty = (e) => {
        const value = e.target.value;
        // Allow empty string or positive numbers
        if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
            setQty(value)
        }
    }


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleButtonClick = async () => {
        const qtyNum = parseFloat(qty);

        if (!qty || qtyNum <= 0 || isNaN(qtyNum)) {
            setMessage("Enter a valid quantity")
            setSnackbarOpen(true);
            handleModalClose();
            setErrorType("error")
        }
        else if (currentFunds && stock.randomNumber && qtyNum <= Math.floor(Number(currentFunds/stock.randomNumber))) {
            executeBuyOrdder(stock);
            setMessage(`Order Executed Successfully. Bought ${stock.name || stock.stockSymbol} x ${qtyNum}.`)
            setErrorType("success")
            setSnackbarOpen(true);
            handleModalClose();
            setQty('');
        } else {
            setMessage("Insufficient funds or invalid quantity")
            setSnackbarOpen(true);
            handleModalClose();
            setErrorType("error")
            setQty('');
        }

        // setSnackbarOpen(true);
        // handleModalClose(); // Optionally close the modal when the button is clicked
    };


    


    return (
        <div>

            <Button variant="contained" onClick={handleModalOpen}>
                B
            </Button>

            <Modal open={modalOpen} onClose={handleModalClose}>
                <Box sx={{ width: "500px", padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
                    <h2 className='text-center text-muted'>Buy {stock.stockSymbol}</h2>
                    <div className='d-flex'>
                        <TextField
                        type='number'
                        id="outlined-basic"
                        label="Quantity"
                        variant="outlined"
                        style={{ "margin": "20px" }}
                        value={qty}
                        onChange={handleQty}
                        helperText={`Max Quantity = ${(currentFunds && stock.randomNumber) ? Math.floor(Number(currentFunds/stock.randomNumber)) : 'Loading...'}`} />
                        <br />
                        <TextField id="filled-basic" label="@Market Price" variant="filled" value={stock.randomNumber} style={{ "margin": "20px" }} disabled />
                    </div>
                    <span className='d-flex align-items-center justify-content-center'>
                        <b>Margin Avilable : {
                            (typeof currentFunds === 'number' && !isNaN(currentFunds))
                                ? currentFunds.toLocaleString('en-IN', {
                                    style: 'currency',
                                    currency: 'INR',
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                                : 'Loading...'
                        } </b>
                    </span>
                    <br />
                    <div className='d-flex  align-items-center justify-content-center mb-2 '>
                    <Button variant="contained" onClick={handleButtonClick}>
                        Buy {stock.stockSymbol}
                    </Button>
                    </div>
                    
                </Box>
            </Modal>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={1500}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={errorType} style={{ "width": "500px", "height": "50px" }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

