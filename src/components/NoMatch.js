import {Link} from 'react-router-dom';
export default function NoMatch(){
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 home'>
                    <p className='home-text'>404 Not Found!</p>
                    <Link to='/' className='btn btn-warning text-dark py-3 home-btn'>Home</Link>
                </div>
            </div>
        </div>
    );
}