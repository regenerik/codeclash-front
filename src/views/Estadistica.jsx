import React, { useState } from 'react'
import './Estadistica.css';
import Navbar from '../components/Navbar.jsx'
import GetOneResume from '../exp-components/GetOneResume.jsx'
import InstantResume from '../exp-components/InstantResume.jsx'
import TotalRanking from '../exp-components/TotalRanking.jsx'
import TotalResume from '../exp-components/TotalResume.jsx'

const Estadistica = () => {
  const [activeTab, setActiveTab] = useState('usuarios');

  const renderTabContent = () => {
      switch (activeTab) {
          case 'ObtenerUnResumen':
              return <GetOneResume />;
          case 'ResumenesInstantaneos':
              return <InstantResume />;
          case 'RankingTotal':
              return <TotalRanking />;
          case 'ResumenTotal':
              return <TotalResume />;
          default:
              return <InstantResume />;
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
                                  className={`tab-button ${activeTab === 'ObtenerUnResumen' ? 'active' : ''}`}
                                  onClick={() => setActiveTab('ObtenerUnResumen')}
                              >
                                  Opcion 1
                              </button>
                              <button
                                  className={`tab-button ${activeTab === 'ResumenesInstantaneos' ? 'active' : ''}`}
                                  onClick={() => setActiveTab('ResumenesInstantaneos')}
                              >
                                  Opcion 2
                              </button>
                              <button
                                  className={`tab-button ${activeTab === 'RankingTotal' ? 'active' : ''}`}
                                  onClick={() => setActiveTab('RankingTotal')}
                              >
                                  Opcion 3
                              </button>
                              <button
                                  className={`tab-button ${activeTab === 'ResumenTotal' ? 'active' : ''}`}
                                  onClick={() => setActiveTab('ResumenTotal')}
                              >
                                  Opcion 4
                              </button>
                          </div>
                          <div className="admin-content">
                              {renderTabContent()}
                          </div>
                      </div>
                  </div>
              ) : (<h2>Logueate con una cuenta administradora para ver este contenido</h2>)
          }
      </div>
  )
}

export default Estadistica