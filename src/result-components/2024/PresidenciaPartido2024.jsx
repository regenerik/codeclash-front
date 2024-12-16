import React, { useEffect, useState } from 'react'

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


    return (
        <div>

            Presidencia Partido 2024

            {
                dataToFill &&
                (
                    dataToFill.votacionPartidosConDistribucion ?
                        dataToFill.votacionPartidosConDistribucion.map((item, index) => {
                            return (
                                <div key={index} className="card mb-4 m-3">
                                    <div className="row card-body bgCard tabla-votos-s" style={{ marginLeft: '0px', marginRight: '0px' }}>
                                        <div className="col-12 pb-2">
                                            <div>
                                                <div className="padding-t-12 dis-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <img
                                                        alt=""
                                                        style={{
                                                            height: "50px", // Tamaño ajustado
                                                            width: "auto"   // Mantiene la proporción
                                                        }}
                                                        className="imagen-candidato-movil"
                                                        src={`https://computos2024.ine.mx/assets/img/partidos${item.emblemaPartido}`}
                                                    />
                                                    <h3>{item.nombrePartido === "CANDIDATURAS NO REGISTRADAS" || item.nombrePartido === "VOTOS NULOS" ? item.nombrePartido : ""}</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 txtNegro font-medium">
                                            <p className="f17">Total de votos</p>
                                            <p className="f17">{item.total}</p>
                                        </div>
                                        <div className="col-6 font-medium txtNegro text-end">
                                            <p className="f17">Porcentaje</p>
                                            <p className="f17">{item.porcentaje}%</p>
                                        </div>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item bgCard-2 f18 padding-l-25 font-medium txtAzulM2">Votos</li>
                                        <li className="list-group-item bgCard-2 d-flex justify-content-between txtAzulM2" style={{ paddingLeft: '2.5em', paddingRight: '27px' }}>
                                            <span className="font-regular f14">En Territorio Nacional</span>
                                            <span className="font-bold f16">{item.totalVN}</span>
                                        </li>
                                        <li className="list-group-item bgCard-1 d-flex justify-content-between txtAzulM2" style={{ paddingLeft: '2.5em', paddingRight: '27px' }}>
                                            <span className="font-regular f14">En el Extranjero*</span>
                                            <span className="font-bold f16">{item.totalVE}</span>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                        :
                        (
                            <div>
                                <h5>Cargando</h5>
                            </div>
                        )


                )
            }

        </div>
    )
}


export default PresidenciaPartido2024