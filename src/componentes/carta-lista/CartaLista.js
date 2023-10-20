import React, { useState } from 'react';
import styles from './CartaLista.module.css';
import Carta from '../carta/Carta.js';

const CartaLista = ({ OBJ, onValueChange}) => {
  const numeroDeCartas = OBJ.cartas.length;
  const cartas = new Array(numeroDeCartas).fill(null);

  const [resumen, setResumen] = useState([]);

  // Función para actualizar el total en el componente Menu
  const handleValueChange = (value, nombre, cantidad, Punidad) => {
    // Crear un objeto con los datos del elemento a agregar o actualizar
    const obj = {
      nombre: nombre,
      cantidad: cantidad,
      Punidad: Punidad,
      total: value
    };
  
    // Clonar el array resumen para no mutar el estado directamente
    const updatedResumen = [...resumen];
  
    // Buscar si el objeto ya existe en el resumen
    const existingIndex = updatedResumen.findIndex((item) => item.nombre === nombre);
  
    if (existingIndex !== -1) {
      // Si el objeto ya existe, actualiza sus propiedades
      updatedResumen[existingIndex] = obj;
    } else {
      // Si el objeto no existe, agrégalo al resumen
      updatedResumen.push(obj);
    }
  
    // Filtrar objetos con cantidad mayor que 0
    const filteredResumen = updatedResumen.filter((item) => item.cantidad > 0);
  
    // Actualizar el estado con el nuevo resumen
    setResumen(filteredResumen);
    const sumaTotal = filteredResumen.reduce((totalSuma, item) => totalSuma + item.total, 0);
    const maiObj = 
    {
      categoria: OBJ.titulo,
      resumen: filteredResumen,
      total: sumaTotal
    };
    onValueChange(maiObj);
  };
  

  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>{OBJ.titulo}</h2>
      <div className={styles.subcontenedor}>
        {cartas.map((_, index) => (
          <Carta
            key={index}
            CD={OBJ.cartas[index]}
            onValueChange={handleValueChange}
          />
        ))}
      </div>
    </div>
  );
};

export default CartaLista;
