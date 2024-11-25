import React from 'react'
// import { Context } from '../js/store/appContext'
import Navbar from '../components/Navbar'
import './Main.css'
import MapSelector from '../components/MapSelector.jsx'

const Main = () => {

    // const { actions } = useContext(Context)
    const token = localStorage.getItem('token')


    return (
        <div className='mainTotal'>
            <Navbar />
            <div className="list-group">
                {
                    token ? (
                        <MapSelector />
                ) 
                    : (<h3>Logueate para acceder a la cartografia</h3>)
                }
            </div>
        </div>
    )
}

export default Main
