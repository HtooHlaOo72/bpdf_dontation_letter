import {Link} from 'react-router-dom';
export default function Home(){
    return (
        <div className='container home'>
            <div className='row'>
                <div className='col-12 '>
                    <p className='fw-bold'>
                        အလှူငွေမှတ်တမ်း ပြုလုပ်သည့် 
                    </p>
                    <p className='fw-bolder home-text '>Web Application</p>
                    <Link to='/dashboard' className='btn  fw-bolder py-3 home-btn'>Dashboard</Link>
                </div>
            </div>
        </div>
    );
}