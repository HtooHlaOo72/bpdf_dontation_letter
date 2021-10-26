import {Link} from 'react-router-dom';
export default function Home(){
    return (
        <div className='container'>
            <div className='row'>
                <header className='col-12 bg-warning home-header mb-3'>
                    <h1>Donation to Bago PDF</h1>
                </header>
                <div className='col-12 bg-danger home'>
                    <p>
                        အလှူငွေမှတ်တမ်း ပြုလုပ်သည့် Web Application
                    </p>
                    <span className='home-text'>Create Donation Receipt</span>
                    <Link to='/login' className='btn btn-warning home-btn home-text'>Login</Link>
                </div>
            </div>
        </div>
    );
}