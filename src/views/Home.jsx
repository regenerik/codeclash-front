import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import './Home.css';
import Login from '../components/Login.jsx';
import reportImage from '../img/report_image-min2.jpg';
import updateImage from '../img/update_image-min2.jpg';
import apiImage from '../img/api_image-min2.jpg';
import upcomingImage from '../img/upcoming_image-min2.jpg';

const Home = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const navigate = useNavigate()

    return (
        <div className='total_home'>
            <Navbar />

            {token ? (
                <>
                    <div className='home-wrapper'>
                        <div className='home-content d-flex flex-column'>
                           <button class="btn btn-dark new-button" onClick={()=>navigate("./estadistica")}>Estadística</button>
                           <button class="btn btn-dark new-button" onClick={()=>navigate("./main")}>Cartografia</button>
                           <button class="btn btn-dark new-button" onClick={()=>navigate("./directorio")}>Directorio</button>
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
