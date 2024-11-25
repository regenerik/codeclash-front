import React, { useState, useEffect, useContext } from 'react';
import estadisticasMenu from '../estadisticas_menu.json'
import { Context } from '../js/store/appContext.js';

const ResuladosElectorales = () => {
// Estados locales para las selecciones
const [selectedAmbito , setSelectedAmbito] = useState('');
const [selectedEntidad, setSelectedEntidad] = useState('');
const [selectedSeccion, setSelectedSeccion] = useState('');
const [selectedCasilla, setSelectedCasilla] = useState('');
const [selectedTipo, setSelectedTipo] = useState('')

const [ tiposDeEleccion, setTiposDeEleccion] = useState([])

const { store, actions} = useContext(Context)


// Opciones dinámicas basadas en las selecciones previas
const entidades = Object.keys(estadisticasMenu);

const secciones =
    selectedEntidad && estadisticasMenu[selectedEntidad]
        ? Object.keys(estadisticasMenu[selectedEntidad])
        : [];

const casillas =
    selectedSeccion && selectedEntidad && estadisticasMenu[selectedEntidad][selectedSeccion]
        ? estadisticasMenu[selectedEntidad][selectedSeccion]
        : [];

// Manejadores de cambios
const handleEntidadChange = (e) => {
    const value = e.target.value;
    setSelectedEntidad(value);
    setSelectedSeccion('');
    setSelectedCasilla('');
};

const handleSeccionChange = (e) => {
    const value = e.target.value;
    setSelectedSeccion(value);
    setSelectedCasilla('');
};

const handleCasillaChange = (e) => {
    setSelectedCasilla(e.target.value);
};

const handleAmbitoChange = (e) => {
    setSelectedAmbito(e.target.value)
}

const handleTipoChange = (e) => {
    setSelectedTipo(e.target.value)
}

const mapEntidad = {
    "AGUASCALIENTES":"01",
    "BAJA CALIFORNIA":"02",
    "BAJA CALIFORNIA SUR":"03",
    "CAMPECHE":"04",
    "CHIAPAS":"05",
    "CHIHUAHUA":"06",
    "CIUDAD DE MEXICO":"07",
    "COAHUILA":"08",
    "COLIMA":"09",
    "DURANGO":"10",
    "GUANAJUATO":"11",
    "GUERRERO":"12",
    "HIDALGO":"13",
    "JALISCO":"14",
    "MEXICO":"15",
    "MICHOACAN":"16",
    "MORELOS":"17",
    "NAYARIT":"18",
    "NUEVO LEON":"19",
    "OAXACA":"20",
    "PUEBLA":"21",
    "QUERETARO":"22",
    "QUINTANA ROO":"23",
    "SAN LUIS POTOSI":"24",
    "SINALOA":"25",
    "SONORA":"26",
    "TABASCO":"27",
    "TAMAULIPAS":"28",
    "TLAXCALA":"29",
    "VERACRUZ":"30",
    "YUCATAN":"31",
    "ZACATECAS":"32"
}
const handleConfirm = async() =>{
    //validaciones
    if(selectedEntidad === '' || selectedSeccion === '' || selectedCasilla === '' || selectedTipo === ''){
        alert('Por favor, selecciona todos los campos')
        return
    }

    const entidad = mapEntidad[selectedEntidad] 
    let concatRegistro = entidad + selectedSeccion + selectedCasilla
    let registro = concatRegistro.padEnd(11, '0')
    let payload = {
        registro: registro,
        tipo: selectedTipo,
        ambito: selectedAmbito
    }
    console.log("ESTE ES EL PAYLOAD: ",payload)
    try{
        await actions.getStadistics(payload)
        
    }catch(e){
        console.error(e)
    }
}

useEffect(()=>{
    if(selectedAmbito === "federal"){
        setTiposDeEleccion(["Presidencia de la república", "Senado", "Diputación Federal"])
    }else if(selectedAmbito === "local"){
        setTiposDeEleccion(["Guvernatura","Diputación local","Alcaldia"])
    }else{
        setTiposDeEleccion([])
    }

    setSelectedTipo("")
},[selectedAmbito])

return (
    <div className="caja-total">
        {/* Selección de ambito */}
        <div>
            <h4>Ámbito</h4>
            <select
                value={selectedAmbito}
                onChange={handleAmbitoChange}
                className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose focus:border-rose inputs"
            >
                <option value="">Seleccionar Ambito</option>

                    <option key="federal" value="federal">
                        Federal
                    </option>

                    <option key="local" value="local">
                        Local
                    </option>

            </select>
        </div>
        <br />
                {/* Selección de tipo de Elección */}
                <div>
            <h4>Tipo de elección</h4>
            <select
                value={selectedTipo}
                onChange={handleTipoChange}
                className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose focus:border-rose inputs"
            >
                <option value="">Seleccionar tipo de elección</option>
                {tiposDeEleccion.map((tipo) => (
                    <option key={tipo} value={tipo}>
                        {tipo}
                    </option>
                ))}
            </select>
        </div>
        <br />
        {/* Selección de entidad */}
        <div>
            <h4>Entidad</h4>
            <select
                value={selectedEntidad}
                onChange={handleEntidadChange}
                className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose focus:border-rose inputs"
            >
                <option value="">Seleccionar Entidad</option>
                {entidades.map((entidad) => (
                    <option key={entidad} value={entidad}>
                        {entidad}
                    </option>
                ))}
            </select>
        </div>
        <br />
        {/* Selección de sección */}
        <div>
            <h4>Sección</h4>
            <select
                value={selectedSeccion}
                onChange={handleSeccionChange}
                className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose focus:border-rose inputs"
                disabled={!selectedEntidad}
            >
                <option value="">Seleccionar Sección</option>
                {secciones.map((seccion) => (
                    <option key={seccion} value={seccion}>
                        {seccion}
                    </option>
                ))}
            </select>
        </div>
        <br />
        {/* Selección de casilla */}
        <div>
            <h4>Casilla</h4>
            <select
                value={selectedCasilla}
                onChange={handleCasillaChange}
                className="block w-full text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose focus:border-rose inputs"
                disabled={!selectedSeccion}
            >
                <option value="">Seleccionar Casilla</option>
                {casillas.map((casilla) => (
                    <option key={casilla} value={casilla}>
                        {casilla}
                    </option>
                ))}
            </select>
        </div>
        <br />
        {/* Mostrar selección final */}
        <div>
            <h4>Selección final</h4>
            <p>
                <strong>Entidad:</strong> {selectedEntidad || 'No seleccionada'} <br />
                <strong>Sección:</strong> {selectedSeccion || 'No seleccionada'} <br />
                <strong>Casilla:</strong> {selectedCasilla || 'No seleccionada'}
            </p>
        </div>
        {/* Botón de confirmación de pedido */}
        <div>
            <button onClick={handleConfirm}>
                Confirmar Pedido
            </button>
        </div>
        {/* --------------------------------RESULTADOS------------------------ */}
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Resultados</h2>
            {
                store.dataEstadisticas.ambito && store.dataEstadisticas.ambito === "federal" ?
                 (
                 <div>
                    <h3>Resultados por Entidad {store.dataEstadisticas.ambito}</h3>
                    <h5>{store.dataEstadisticas.resultado && store.dataEstadisticas.resultado.join(",")}</h5>
                 </div>
                ):(
                <div>
                    <h3>Resultados por Entidad {store.dataEstadisticas.ambito}</h3>
                    <h5>{store.dataEstadisticas.resultado && store.dataEstadisticas.resultado.join(",")}</h5>
                </div>
                )
            }
        </div>
    </div>
);
};

export default ResuladosElectorales;