import React, { useState } from 'react'
import './Estadistica.css';
import Navbar from '../components/Navbar.jsx'
import ResuladosElectorales from '../exp-components/ResultadosElectorales.jsx'
import InstantResume from '../exp-components/InstantResume.jsx'
import TotalRanking from '../exp-components/TotalRanking.jsx'
import TotalResume from '../exp-components/TotalResume.jsx'
import RedirectToHome from '../components/RedirectHome.jsx';

const Estadistica = () => {
  const [activeTab, setActiveTab] = useState('usuarios');

  const renderTabContent = () => {
      switch (activeTab) {
          case 'ResuladosElectorales':
              return <ResuladosElectorales />;
          case 'ResumenesInstantaneos':
              return <InstantResume />;
          case 'RankingTotal':
              return <TotalRanking />;
          case 'ResumenTotal':
              return <TotalResume />;
          default:
              return <ResuladosElectorales />;
      }
  };
  
  const token = localStorage.getItem('token')
  return (
      <div>
        
          <Navbar />
          {/* Imagen temporal para que no se vean los menus cortados */}
          <img src='https://universidaddepadres.es/wp-content/uploads/humanos_construccion.jpg' class='img-fluid rounded mx-auto d-block'></img>

          {
            token ? (
                  <div>
                      {/* <div className="admin-container">
                          <div className="admin-tabs">
                              <button
                                  className={`tab-button ${activeTab === 'ResuladosElectorales' ? 'active' : ''}`}
                                  onClick={() => setActiveTab('ResuladosElectorales')}
                              >
                                  Resultados Electorales
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
                          <div className="admin-content bg-dark-subtle">
                              {renderTabContent()}
                          </div>
                      </div> */}
                      
                  </div>
                  
              ) : (
              <RedirectToHome />
            )
          }
      </div>
      
  )
}


export default Estadistica