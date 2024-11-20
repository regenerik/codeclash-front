import React, { useState, useContext } from 'react';
import { Context } from '../js/store/appContext.js';

const GetOneResume = () => {
  const [apies, setApies] = useState(''); 

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Servicio 1</h2>
      
      <p style={{ marginTop: '20px' }}>Ingresa la logica del servicio de estadistica 1</p>
    </div>
  );
};

export default GetOneResume;