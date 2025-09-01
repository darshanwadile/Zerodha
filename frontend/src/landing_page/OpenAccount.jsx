import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function OpenAccount() {
    return (
        <div className="container p-5">
            <div className="row text-center">
                <div className="col">
                    <h1 className="mt-3 p-3">Open a Zerodha account</h1>
                    <p className='p-3 text-muted fs-4'>
                        Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
                    </p>
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <Button variant='contained' className='p-3' style={{ "width": "30%" }}>Sign up for free</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}