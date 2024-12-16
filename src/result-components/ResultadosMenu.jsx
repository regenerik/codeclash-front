import React, { useState, useEffect } from "react";
import menuData from "../menu_resultados.json"; // Importamos el JSON

// Importación de todos los componentes posibles
import SenaduriasVotosEntidades2018 from "./2018/SenaduriasVotosEntidades2018";
import SenaduriasVotosPartido2018 from "./2018/SenaduriasVotosPartido2018";
import DiputacionesVotosDistritos2018 from "./2018/DiputacionesVotosDistritos2018";
import DiputacionesVotosPartidos2018 from "./2018/DiputacionesVotosPartidos2018";
import PresidenciaPartido2018 from "./2018/PresidenciaPartido2018";
import PresidenciaCandidatura2018 from "./2018/PresidenciaCandidatura2018";

import DiputacionesVotosDistritos2021 from "./2021/DiputacionesVotosDistritos2021";
import DiputacionesVotosPartidos2021 from "./2021/DiputacionesVotosPartidos2021";

import SenaduriasVotosEntidades2024 from "./2024/SenaduriasVotosEntidades2024";
import SenaduriasVotosPartido2024 from "./2024/SenaduriasVotosPartido2024";
import DiputacionesVotosDistritos2024 from "./2024/DiputacionesVotosDistritos2024";
import DiputacionesVotosPartidos2024 from "./2024/DiputacionesVotosPartidos2024";
import PresidenciaPartido2024 from "./2024/PresidenciaPartido2024";
import PresidenciaCandidatura2024 from "./2024/PresidenciaCandidatura2024";

const ResultadosMenu = () => {
  const [currentMenu, setCurrentMenu] = useState(menuData);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null); // Para almacenar el componente seleccionado

  const handleSelect = (option) => {
    if (currentMenu[option]) {
      setBreadcrumbs([...breadcrumbs, option]);
      setCurrentMenu(currentMenu[option]);
    } else {
      alert("No hay más opciones disponibles para esta selección.");
    }
  };

  const goBack = () => {
    if (breadcrumbs.length > 0) {
      const newBreadcrumbs = [...breadcrumbs];
      newBreadcrumbs.pop();
      const newMenu = newBreadcrumbs.reduce((acc, key) => acc[key], menuData);
      setCurrentMenu(newMenu);
      setBreadcrumbs(newBreadcrumbs);
    }
  };

  const handleConfirm = () => {
    const currentPath = breadcrumbs.join(" > "); // Obtiene la ruta seleccionada como string

    // Renderiza el componente correspondiente según la selección
    switch (currentPath) {
      case "federal > 2018 > senadurias > votos por entidades":
        setSelectedComponent(<SenaduriasVotosEntidades2018 />);
        break;
      case "federal > 2018 > senadurias > votos por partido politico":
        setSelectedComponent(<SenaduriasVotosPartido2018 />);
        break;
      case "federal > 2018 > diputaciones > votos por distritos":
        setSelectedComponent(<DiputacionesVotosDistritos2018 />);
        break;
      case "federal > 2018 > diputaciones > votos por partidos politicos y candidatura independiente":
        setSelectedComponent(<DiputacionesVotosPartidos2018 />);
        break;
      case "federal > 2018 > presidencia > partido":
        setSelectedComponent(<PresidenciaPartido2018 />);
        break;
      case "federal > 2018 > presidencia > candidatura":
        setSelectedComponent(<PresidenciaCandidatura2018 />);
        break;
      case "federal > 2021 > diputaciones > votos por distritos":
        setSelectedComponent(<DiputacionesVotosDistritos2021 />);
        break;
      case "federal > 2021 > diputaciones > votos por partidos politicos y candidatura independiente":
        setSelectedComponent(<DiputacionesVotosPartidos2021 />);
        break;
      case "federal > 2024 > senadurias > votos por entidades":
        setSelectedComponent(<SenaduriasVotosEntidades2024 />);
        break;
      case "federal > 2024 > senadurias > votos por partido politico":
        setSelectedComponent(<SenaduriasVotosPartido2024 />);
        break;
      case "federal > 2024 > diputaciones > votos por distritos":
        setSelectedComponent(<DiputacionesVotosDistritos2024 />);
        break;
      case "federal > 2024 > diputaciones > votos por partidos politicos y candidatura independiente":
        setSelectedComponent(<DiputacionesVotosPartidos2024 />);
        break;
      case "federal > 2024 > presidencia > partido":
        setSelectedComponent(<PresidenciaPartido2024 />);
        break;
      case "federal > 2024 > presidencia > candidatura":
        setSelectedComponent(<PresidenciaCandidatura2024 />);
        break;
      default:
        alert("Ruta no mapeada. Mostrando un componente por defecto.");
        setSelectedComponent(<div>Componente no encontrado</div>);
    }
  };

  // Asegurar que el scroll esté arriba cuando se renderiza un componente
  useEffect(() => {
    if (selectedComponent) {
      window.scrollTo(0, 0); // Forzar scroll al tope
    }
  }, [selectedComponent]);

  return (
    <div className="d-flex justify-content-center p-4">
      {selectedComponent ? (
        // Renderizar el componente seleccionado
        <div className="card shadow p-4 w-100 text-center">
          <h1 className="mb-4">Resultados</h1>
          {selectedComponent}
        </div>
      ) : (
        // Mostrar el menú si no hay componente seleccionado
        <div className="card shadow p-4 w-100 text-center">
          <h1 className="mb-4">Selección de Resultados</h1>
          <div>
            <p className="mb-4">Ruta seleccionada: {breadcrumbs.join(" > ") || "Inicio"}</p>
            <ul className="list-unstyled">
              {Object.keys(currentMenu).map((key) => (
                <li key={key} className="mb-2">
                  <button className="btn btn-primary w-100" onClick={() => handleSelect(key)}>
                    {key}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <button className="btn btn-secondary me-2" onClick={goBack} disabled={breadcrumbs.length === 0}>
              Volver
            </button>
            <button className="btn btn-success" onClick={handleConfirm} disabled={breadcrumbs.length === 0}>
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultadosMenu;
