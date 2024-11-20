import React, { useContext } from 'react'
import { Context } from '../js/store/appContext'
import Navbar from '../components/Navbar'
import './Main.css'

const Main = () => {

    const { actions } = useContext(Context)
    const token = localStorage.getItem('token')


    return (
        <div className='mainTotal'>
            <Navbar />
            <div className="list-group">
                {
                    token ? (<h1>Acá la cartografia</h1>) : (<h3>Logueate para acceder a los reportes</h3>)
                }
            </div>
        </div>
    )
}

export default Main
