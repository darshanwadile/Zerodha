import Button from '@mui/material/Button';
import PieChartIcon from '@mui/icons-material/PieChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import AddFundsBtn from './AddFundsBtn';
import { useEffect, useState } from 'react';
import apiClient from '../../utils/apiClient';

// 1. Create a single, reusable function for formatting currency.
// This makes your code DRY (Don't Repeat Yourself).
const formatCurrency = (value) => {
    return (Number(value) || 0).toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export default function Funds() {
    const [currentFunds, setCurrentFunds] = useState(0);
    // In a real app, you'd fetch this whole object from an API
    const [fundDetails, setFundDetails] = useState({
        usedMargin: 0,
        availableCash: 0,
        payIn: 0,
        payOut: 0,
        span: 0,
        deliveryMargin: 0,
        exposure: 0,
        optionsPremium: 0,
    });

    useEffect(() => {
        async function getCurrentFunds() {
            try {
                const response = await apiClient.get("/getFunds");
                setCurrentFunds(response.data.fundsAvilable);
                // You could also fetch other fund details here and update the state
            } catch (error) {
                console.error("Failed to fetch funds:", error);
            }
        }
        getCurrentFunds();
    }, []);

    // 2. Structure your data as an array of objects.
    // This makes it easy to add, remove, or reorder items.
    const summaryData = [
        { label: 'Available margin', value: currentFunds },
        { label: 'Used margin', value: fundDetails.usedMargin },
        { label: 'Available Cash', value: currentFunds }, // Assuming this is the same as currentFunds
        { type: 'divider' },
        { label: 'Opening Balance', value: currentFunds },
        { label: 'Pay in', value: fundDetails.payIn },
        { label: 'Pay Out', value: fundDetails.payOut },
        { label: 'Span', value: fundDetails.span },
        { label: 'Delivery Margin', value: fundDetails.deliveryMargin },
        { label: 'Exposure', value: fundDetails.exposure },
        { label: 'Options Premium', value: fundDetails.optionsPremium },
        { type: 'divider' },
    ];

    return (
        <>
            <div className="container p-4">
                <div className="addWithdrawButtons d-flex align-items-center justify-content-center mt-3">
                    <AddFundsBtn setCurrentFunds={setCurrentFunds} />
                </div>

                <div className="equity d-flex m-5 align-items-center justify-content-around">
                    <div className="headings">
                        <h4 className='text-muted'> <PieChartIcon /> Equity</h4>
                    </div>
                    <div className="statement">
                        <a href='#' style={{ "textDecoration": "none" }}>
                            <TripOriginIcon /> View Statement <ArrowForwardIcon />
                        </a>
                    </div>
                </div>

                {/* 3. Render the data by mapping over the array. */}
                {/* This code is now much cleaner and easier to maintain. */}
                <div className="detail mt-3 d-flex align-items-center justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        {summaryData.map((item, index) => {
                            if (item.type === 'divider') {
                                return <hr key={index} />;
                            }
                            return (
                                <div key={index} className="d-flex justify-content-between">
                                    <p>{item.label} :</p>
                                    <p>{formatCurrency(item.value)}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}