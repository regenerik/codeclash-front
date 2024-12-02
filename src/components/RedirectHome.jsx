import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home"); // Redirigimos a la página que quieras
        }, 3000); // 3 segundos

        return () => clearTimeout(timer); // Limpiamos el timer al desmontar
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h3>No estás logueado, redirigiendo a login...</h3>
        </div>
    );
};

export default RedirectToHome;
