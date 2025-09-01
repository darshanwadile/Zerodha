// import { watchlist } from "../../data/data.js"
import WatchListComponent from './WatchListComponent.jsx';
import { v4 as uuidv4 } from 'uuid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from "react";
import apiClient from '../../utils/apiClient';
import { stocks } from "../../../utils/stocks.js";
import LinearProgress from '@mui/material/LinearProgress';


export default function WatchList() {
    const [watchList, setWatchList] = useState([]);
    const [addedStock, setAddedStock] = useState('');

    async function getWatchList() {
        let responses = await apiClient.get("/getWatchlist");
        responses = responses.data;
        setWatchList(responses);
    }

    useEffect(()=>{
        getWatchList();
    },[])


    //Handle selected stock
    let handleSelectedStock = (e) => {
        if(e.target.value){
            async function addStockToWatchList(stockSymbol) {
                let sendData = {stockName:stockSymbol};
                let result = await apiClient.post("/addNewWatchListStock",sendData);
                let responses = await apiClient.get("/getWatchlist");
                responses = responses.data;
                setWatchList(responses);
            }
            addStockToWatchList(e.target.value)
        }
        setAddedStock(e.target.value);
    }



    return (
        <div className="container-fluid">
            <div className="d-flex p-3 border-bottom ">
                <Box sx={{ width: "100%" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Add</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={addedStock}
                            label="Add"
                            onChange={handleSelectedStock}
                        >
                            {
                                stocks.map((currStock) => (
                                    <MenuItem key={currStock.stockSymbol} value={currStock.stockSymbol}>{currStock.stockName}</MenuItem>
                                ))
                            }
                        </Select>

                    </FormControl>
                </Box>
            </div>

            <div>


            </div>
            {
                watchList.map((stock, index) => {
                    return (
                        <>
                            <WatchListComponent key={stock._id || `${stock.stockName}-${index}`} stock={stock} setWatch={setWatchList}/>
                            <hr />
                        </>
                    )
                })
            }
        </div>
    )
}