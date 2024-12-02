import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';
import './Afiliaciones.css'
import RedirectToHome from '../components/RedirectHome.jsx';


const Afiliaciones = () => {

  const { actions } = useContext(Context)
  const [afiliaciones, setAfiliaciones] = useState({
    clave_elector: "",
    apellido_paterno: "",
    apellido_materno: "",
    nombre: "",
  })

  const handlerafiliacion = (e) => {
    let value = e.target.value
    let name = e.target.name
    setAfiliaciones({ ...afiliaciones, [name]: value })
  }

  const handleConsulta = async () => {
    try {
      actions.getAfiliacion(afiliaciones)
    } catch (e) {
      console.error(e)
    }
  }
  const token = localStorage.getItem('token');

  return (
    <div>
      {
        token ? (

          <div className='afiliaciones-total'>
            <div className='title'>
              <h1>Verifica Afiliación</h1>
            </div>
            <div className='inputs-box'>
              <div className="caja-input">
                <span className='adjust'>Clave de elector</span>
                <input type="text" className='input' name="clave_elector" onChange={handlerafiliacion} placeholder="clave" aria-label="clave" aria-describedby="addon-wrapping" />
              </div>
              <div className="caja-input">
                <span className='adjust'>Apellido paterno</span>
                <input type="text" className='input' name="apellido_paterno" onChange={handlerafiliacion} placeholder="apellido paterno" aria-label="apellido paterno" aria-describedby="addon-wrapping" />
              </div>
              <div className="caja-input">
                <span className='adjust'>Apellido materno</span>
                <input type="text" className='input' name="apellido_materno" onChange={handlerafiliacion} placeholder="apellido materno" aria-label="apellido materno" aria-describedby="addon-wrapping" />
              </div>
              <div className="caja-input">
                <span className='adjust'>Nombre</span>
                <input type="text" className='input' name="nombre" onChange={handlerafiliacion} placeholder="nombre" aria-label="nombre" aria-describedby="addon-wrapping" />
              </div>
            </div>
            <button className='boton-consulta btn btn-warning' onClick={handleConsulta}>
              Consultar
            </button>
          </div>

        )
          :
          (
            <RedirectToHome />
          )
      }




    </div>
  )
}

export default Afiliaciones