import React, { useState } from 'react'
import './Directorio.css';
import Navbar from '../components/Navbar.jsx'

const Directorio = () => {

    const [activeTab, setActiveTab] = useState('usuarios');

    const admin = JSON.parse(localStorage.getItem('admin'));
    const token = localStorage.getItem('token')

  return (
    <div>
        <Navbar token={token} admin={admin} />
        <h1>Directorio</h1>
    </div>
  )
}

export default Directorio