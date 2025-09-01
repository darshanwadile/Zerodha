// import { holdings } from "../data/data.js"
import { v4 as uuidv4 } from 'uuid';
import "./Holdings.css"
import { useEffect, useState } from "react";
import apiClient from '../../utils/apiClient';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Holdings() {
    const data = [
        { label: 'Group A', value: 400 },
        { label: 'Group B', value: 300 },
        { label: 'Group C', value: 300 },
        { label: 'Group D', value: 200 },
    ];

    const [holdings, setHoldings] = useState([])
    const [holdingsfetched, setHoldingsFetched] = useState(false);

    useEffect(() => {
        setInterval(() => {
            async function getData() {
                setHoldingsFetched(false);
                let response = await apiClient.get("/allHoldings")
                response = response.data;
                setHoldings(response);
                setHoldingsFetched(true);
            }
            getData()
        }, 1000)
    }, [])



    let totalProfit = holdings.reduce((netTotal, currVaue, curIndex) => {
        return Math.floor(netTotal + (currVaue.price * currVaue.qty));
    }, 0) - holdings.reduce((netTotal, currVaue, curIndex) => {
        return Math.floor(netTotal + (currVaue.avg * currVaue.qty));
    }, 0);



    return (
        <div className="  container d-flex flex-column  justify-content-between h-100">
            <div className="order-table ms-5 me-5">
                <h3 className="title mt-5 mb-4 text-center text-muted">Holdings ({holdings.length})  </h3>
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
                <table className="table mb-5 ms-2">
                    <thead>
                        <tr>
                            <th scope="col">Instrument</th>
                            <th scope="col"> Qty.</th>
                            <th scope="col">Avg. cost</th>
                            <th scope="col">LTP</th>
                            <th scope="col">Cur Val</th>
                            <th scope="col">P&L</th>
                            <th scope="col">Net chg.</th>
                            <th scope="col">Day chg.</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            holdings.map((currElement, index) => {
                                let pAndl = Math.floor((currElement.price * currElement.qty) - (currElement.qty * currElement.avg))
                                let DayChange = parseFloat(currElement.day);
                                let netChange = Math.floor(currElement.price - currElement.avg);

                                return (
                                    <tr key={currElement.name || index}>
                                        <td className={(pAndl < 0 ? "red" : (pAndl > 0) ? "green" : "")}>{currElement.name}</td>
                                        <td>{currElement.qty}</td>
                                        <td>{currElement.avg}</td>
                                        <td>{currElement.price}</td>
                                        <td>{Math.floor(currElement.price * currElement.qty)}</td>
                                        <td className={(pAndl < 0 ? "red" : (pAndl > 0) ? "green" : "")}>{pAndl}</td>
                                        <td className={(netChange < 0 ? "red" : (netChange > 0) ? "green" : "")}>{netChange}</td>
                                        <td className={(DayChange < 0 ? "red" : (DayChange > 0) ? "green" : "")}>{DayChange + " %"}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
            <div className="container d-flex align-items-center justify-content-around text-center">
                <div className="investment">
                    <h5 className="">
                        {
                            holdings.reduce((netTotal, currVaue, curIndex) => {
                                return Math.floor(netTotal + (currVaue.avg * currVaue.qty));
                            }, 0).toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })
                        }

                    </h5>
                    <p>Total investment</p>
                </div>
                <div className="CuurentValue">
                    <h5>
                        {
                            holdings.reduce((netTotal, currVaue, curIndex) => {
                                return Math.floor(netTotal + (currVaue.price * currVaue.qty));
                            }, 0).toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })
                        }
                    </h5>
                    <p>Current value</p>
                </div>
                <div className="p&l">
                    <h5 className={totalProfit > 0 ? "green" : totalProfit < 0 ? "red" : ""}>{
                        totalProfit.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })
                    }</h5>
                    <p>P&L</p>
                </div>
            </div>
        </div>
    )
}