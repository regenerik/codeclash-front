import React, { useEffect, useState } from 'react'
import 'charts.css';
import ReactECharts from 'echarts-for-react';





const PresidenciaPartido2024 = () => {
    const [dataToFill, setDataToFill] = useState({})
    useEffect(() => {
        const getData = async () => {
            try {
                let response = await fetch(`https://computos2024.ine.mx/assets/JSON/PRESIDENTE/NACIONAL/Presidente_NACIONAL.json`)
                let data = await response.json()
                console.log(data)
                setDataToFill(data)
            } catch (e) {
                console.error(e)
            }
            console.log("Obteniendo datos...");
        };
        getData();
    }, [])
    
    const option = {
        tooltip: { trigger: 'item', },
       
        series: [{
            name: "", type: 'pie', radius: '65%',
            data: [
                { value: 16.04, name: '' },
                { value: 9.54, name: '' },
                { value: 1.86, name: '' },
                { value: 6.46, name: '' },
                { value: 7.78, name: '' },
                { value: 45.52, name: '' },
                { value: 10.32, name: '' },
                { value: 2.33, name: '' },
             
            ],
            emphasis: {
                itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)', },
            },
        },],
    };
    return (
        <>
        <div className='row'>
            <div className='card home-wrapper container-fluid col'  >
                <table className=" table-fluid  bg-light align-middle mb-1 m-1 stripped text-center p-2">
                    <thead className='border-dark bg-dark border-1'>
                        <tr >
                            <th className="table-dark" scope="col">Partido</th>
                            <th className="table-dark" scope="col">  Total </th>
                            <th className="table-dark" scope="col">  %  </th>
                            <th className="table-dark" scope="col">Lugar</th>
                        </tr>
                    </thead>
                    {dataToFill &&(dataToFill.votacionPartidosConDistribucion ? dataToFill.votacionPartidosConDistribucion.map((item, index) => {
                return (
                    <tbody key={index}  >
                        <tr className='border-dark border-1 table-stripped'>
                            <th scope="row">
                                <img alt="" style={{height: "50px", width: "auto"}} className="imagen-candidato-movil" src={`https://computos2024.ine.mx/assets/img/partidos${item.emblemaPartido}`}/>

                                                </th>
                                                <td className='bg-info-subtle'>
                                                    <p className="f17">{(item.total).toLocaleString()}</p>
                                                </td>
                                                <td>
                                                    <p className="f17">{(item.porcentaje).toFixed(2)}%</p>
                                                </td >
                                                {/* ranking */}
                                                <td><p className="f17">i</p></td>

                                            </tr>
                                        </tbody>
)}):
(
                                    <div>
                                        <h5>Cargando</h5>
                                    </div>
                                )
                        )
                    }
                </table>
            </div>
            <ReactECharts option={option} style={{ height: '400px', width: '100%' }} className='col'/>
        </div>
        </>
    )
}


export default PresidenciaPartido2024