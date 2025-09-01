// import { positions } from "../data/data.js"
import { v4 as uuidv4 } from 'uuid';
import apiClient from "../utils/apiClient";
import { useState,useEffect } from 'react';

export default function Positions() {
    const [positions,setPositions] = useState([])
    
    useEffect(()=>{
       async function getData() {
            let response = await apiClient.get("/allPositions")
            setPositions(response.data);
       }
       getData()
    },[])

    return (
        <>
            <div className="container text-center">
                <h3 className="title m-5 pb-2 text-center">Positions ({positions.length})</h3>

                <div className="order-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Instrument</th>
                                <th scope="col">Qty.</th>
                                <th scope="col">Avg.</th>
                                <th scope="col">LTP</th>
                                <th scope="col">P&L</th>
                                <th scope="col">Chg.</th>
                            </tr>
                        </thead>
                        <tbody>
                        {positions.map((position, index) => {

                            let pAndl = Math.floor((position.price * position.qty) - (position.avg * position.qty));

                            return (
                                <tr key={position.name || index}>
                                    <td>{position.product}</td>
                                    <td>{position.name}</td>
                                    <td>{position.qty}</td>
                                    <td>{position.avg}</td>
                                    <td>{position.price}</td>
                                    <td className={pAndl > 0 ? "green" : pAndl < 0 ? "red":""} >{pAndl}</td>
                                    <td className={parseFloat(position.net) > 0 ? "green" : parseFloat(position.net) < 0 ? "red":""}>{position.net}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div >

        </>
    )
}