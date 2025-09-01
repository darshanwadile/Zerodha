import "./Summary.css";
import { useState, useEffect, useMemo } from "react";
import apiClient from '../../utils/apiClient';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Summary() {
    const [currentFunds, setCurrentFunds] = useState(0);
    const [holdings, setHoldings] = useState([]);
    const [loading, setLoading] = useState(true); // 1. Add loading state

    useEffect(() => {
        // Function to fetch all data at once
        const fetchData = async () => {
            try {
                // Use Promise.all to run requests in parallel for speed
                const [fundsResponse, holdingsResponse] = await Promise.all([
                    apiClient.get("/getFunds"),
                    apiClient.get("/allHoldings")
                ]);
                setCurrentFunds(fundsResponse.data.fundsAvilable);
                setHoldings(holdingsResponse.data);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false); // Stop loading, even if there's an error
            }
        };

        fetchData(); // Fetch immediately on component mount

        // 2. Set up an interval that can be cleared
        const intervalId = setInterval(fetchData, 4000);

        // 3. Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty array ensures this effect runs only once on mount

    // 4. Use useMemo to optimize calculations
    // These values will only be recalculated when the 'holdings' state changes
    const investment = useMemo(() => {
        return holdings.reduce((total, stock) => total + (stock.avg * stock.qty), 0);
    }, [holdings]);

    const currentValue = useMemo(() => {
        return holdings.reduce((total, stock) => total + (stock.price * stock.qty), 0);
    }, [holdings]);
    
    const totalProfit = useMemo(() => currentValue - investment, [currentValue, investment]);
    
    // Helper function for consistent currency formatting
    const formatCurrency = (value) => {
        return (value || 0).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    // 5. Show a loading indicator while fetching initial data
    if (loading) {
        return <Box sx={{ width: '100%', mt: 10 }}><LinearProgress /></Box>;
    }
    
    // Your JSX remains mostly the same, just using the formatted values
    return (
        <div className="container mt-5 ms-3 mb-3 text-muted ">
            <div className="header mt-5 pb-3">
                <h4 className='mb-4'>Welcome To kite</h4>
                <hr />
            </div>

            <div className="equity mb-5">
                <h4 className='mb-2'>Equity</h4>
                <div className="holdingSummary d-flex">
                    <div className="avilableMargin p-5 d-flex flex-column align-items-center justify-content-center border-end">
                        <h2 className={currentFunds > 0 ? "green" : currentFunds < 0 ? "red" : ""}>
                            {formatCurrency(currentFunds)}
                        </h2>
                        <p className='mt-1'>Margin Available</p>
                    </div>
                    <div className="MarginSummary ms-5 d-flex flex-column align-items-center justify-content-center">
                        <p>Margin Used : 0</p>
                        <p className={currentFunds > 0 ? "green" : currentFunds < 0 ? "red" : ""}>
                            Opening Balance : {formatCurrency(currentFunds)}
                        </p>
                    </div>
                </div>
                <hr />
            </div>

            <div className="holdings mt-5">
                <h4 className='mt-4 mb-2'>Holdings ({holdings.length})</h4>
                <Box sx={{ width: '100%' }}><LinearProgress variant="determinate" value={100} /></Box>
                <div className="data d-flex">
                    <div className="first p-5 border-end">
                        <h3 className={totalProfit > 0 ? "green" : totalProfit < 0 ? "red" : ""}>
                            {formatCurrency(totalProfit)}
                        </h3>
                        <p>P&L</p>
                    </div>
                    <hr />
                    <div className="second m-5">
                        <p>
                            Current Value <br />
                            <span>{formatCurrency(currentValue)}</span>
                        </p>
                        <p>
                            Investment <br />
                            <span>{formatCurrency(investment)}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}