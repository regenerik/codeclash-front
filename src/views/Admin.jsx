import React, { useState } from 'react'
import './Admin.css';
import Navbar from '../components/Navbar.jsx'
import Reportes from '../adm-components/Reportes.jsx';
import Errores from '../adm-components/Errores.jsx';
import Servidor from '../adm-components/Servidor.jsx';
import RedirectToHome from '../components/RedirectHome.jsx';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('usuarios');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'reportes':
                return <Reportes />;
            case 'errores':
                return <Errores />;
            case 'servidor':
                return <Servidor />;
            default:
                return <Servidor />;
        }
    };
    const admin = JSON.parse(localStorage.getItem('admin'));
    const token = localStorage.getItem('token')
    return (
        <div>
            <Navbar />
            {
                admin === true && token ? (
                    <div>
                        <div className="admin-container">
                            <div className="admin-tabs">
                                <button
                                    className={`tab-button ${activeTab === 'usuarios' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('usuarios')}
                                >
                                    Usuarios
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'reportes' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('reportes')}
                                >
                                    Reportes
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'errores' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('errores')}
                                >
                                    Errores
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'servidor' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('servidor')}
                                >
                                    Servidor
                                </button>
                            </div>
                            <div className="admin-content">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>
                ) : (
                <RedirectToHome />
            )
            }
        </div>
    )
}

export default Admin