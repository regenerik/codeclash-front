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
                        <div className='home-content'>
                            <section className="section-welcome home-section">
                                <div className="welcome-image">
                                    <img src={reportImage} alt="Organización de reportes" />
                                    <div className="welcome-text">
                                        <h1>Bienvenido a E3, {name}</h1>
                                        <h2>¡Toda la información electoral a tus pies!</h2>
                                    </div>
                                </div>
                            </section>
                            <section className="section-update home-section">
                                <div className="update-content home-text">
                                    <h2>¿Sabías que podés revisar la cartografia desde acá cuando quieras?</h2>
                                    <p>No dejes de visitar nuestra sección de cartografia.</p>
                                    <h5 onClick={()=> navigate('./main')} className="btn-action">Ir a Cartografia</h5>
                                </div>
                                <div className="update-image home-image">
                                    <img src={updateImage} alt="Actualización de reportes" />
                                </div>
                            </section>

                            <section className="section-api home-section reverse">
                                <div className="api-content home-text">
                                    <h2>¿Tenés dudas de cómo utilizar nuestra A.P.I?</h2>
                                    <p>Ya no más. Accedé a la documentación completa desde acá:</p>
                                    <a href="https://e3digital.onrender.com/" target="_blank" rel="noopener noreferrer" className="btn-action">Ver Documentación de la API</a>
                                </div>
                                <div className="api-image home-image">
                                    <img src={apiImage} alt="Documentación API" />
                                </div>
                            </section>

                            <section className="section-upcoming home-section">
                                <div className="upcoming-content home-text">
                                    <h2>Lo que se viene</h2>
                                    <p>Próximamente podrás acceder a toda la información estadística desde nuestra app web.</p>
                                </div>
                                <div className="upcoming-image home-image">
                                    <img src={upcomingImage} alt="Futuras funcionalidades" />
                                </div>
                            </section>
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
