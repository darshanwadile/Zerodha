import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import NewBuyButton from './BuyButton/NewBuyButton.jsx';
import apiClient from '../../utils/apiClient';
import NewSellButton from './SellButton/NewSellButton.jsx';

export default function WatchListActions({stock,setWatch}) {

    let handleDelete = async(e)=>{
        let deleteResult = await apiClient.post("/deleteStock",{"stockName":stock.stockSymbol});
        let responses = await apiClient.get("/getWatchlist");
        responses = responses.data;
        setWatch(responses);
    }


    return (

        <div>
            <Stack spacing={1} direction="row" >
                <Tooltip  title="Buy" arrow placement='top'> <NewBuyButton stock={stock}/> </Tooltip>
                <Tooltip  title="Sell" arrow placement='top'><NewSellButton stock={stock}/></Tooltip>
                <Tooltip  title="Delete" arrow placement='top'><Button onClick={handleDelete} variant="contained" size='small' style={{"backgroundColor":"rgb(242, 192, 126)"}}><DeleteIcon/></Button></Tooltip>

            </Stack>
        </div>
    )
}