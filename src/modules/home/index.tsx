import React, { useEffect } from 'react';
import './home.css';

export const Home = () => {

  useEffect(() => {
    fetch('http://api.monitor.altiacamp.com/info').then((response) => response.json()).then((response) => {
        console.log(response);
    });
  }, []);

  return (
    <div className="home">
      Esto es la home, poner una lista de proyectos
      LISTAR LOS PROYECTOS Y PONER UN FORMULARIO PARA CREAR UNO NUEVO Y OTRO PARA DESPLEGAR
    </div>
  );
}
