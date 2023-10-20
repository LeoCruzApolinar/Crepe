import React, { useState } from 'react';
import styles from './Carta.module.css';

const Carta = ({ CD, onValueChange }) => {
  const [cantidad, setCantidad] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  const handleCantidadChange = (event) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
  
    if (nuevaCantidad >= 0) {
      setCantidad(nuevaCantidad);
      onValueChange(CD.precio * nuevaCantidad, CD.titulo, nuevaCantidad, CD.precio); // Pasar nombre y cantidad
    }
  };
  

  const handleCheckboxChange = () => {
    const isCheckedValue = !isChecked;

    setIsChecked(isCheckedValue);

    if (isCheckedValue) {
      onValueChange(CD.precio, CD.titulo, 1, CD.precio); // Pasar nombre y cantidad
    } else {
      onValueChange(0, CD.titulo, 0, CD.precio); // Pasar nombre y cantidad
    }
  };

  const selectOptions = Array.from({ length: 11 }, (_, i) => (
    <option key={i} value={i}>
      {i}
    </option>
  ));

  return (
    <div className={styles.contenedor}>
      <img className={styles.Imagen} src={CD.logo} alt='logo' />
      <div className={styles.Subcontenedor}>
        <div className={styles.TituloN}>{CD.titulo}</div>
        <div className={styles.TituloP}>{CD.precio}</div>
      </div>
      {CD.modo ? (
        <select
          id="numeroInput"
          name="numero"
          value={cantidad}
          onChange={handleCantidadChange}
          className={styles.SelectoerN}
        >
          {selectOptions}
        </select>
      ) : (
        <input
          type="checkbox"
          id="checkboxInput"
          name="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={styles.Checkbox}
        />
      )}
    </div>
  );
};

export default Carta;
