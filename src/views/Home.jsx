import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import './Home.css';
import Login from '../components/Login.jsx';

const Home = () => {
    const token = localStorage.getItem('token');
    // const name = localStorage.getItem('name');
    const navigate = useNavigate()

    return (
        <div className='total_home'>
            <Navbar />

            {token ? (
                <>
                    <div className='home-wrapper position-absolute top-50 start-50 translate-middle'>
                        <div className='home-content d-flex flex-column bg-dark-subtle'>
                           <button className="btn btn-dark new-button" onClick={()=>navigate("./estadistica")}>Estadística</button>
                           <button className="btn btn-dark new-button" onClick={()=>navigate("./main")}>Cartografia</button>
                           <button className="btn btn-dark new-button" onClick={()=>navigate("./utilidades")}>Herramientas</button>
                        </div>
                    </div>
                </>
            ) : (
                <Login />
            )}

        </div>
    );
}

export default Home;
