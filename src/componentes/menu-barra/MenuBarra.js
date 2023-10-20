import React, { useState } from 'react';
import styles from './MenuBarra.module.css';
import logo from '../../media/Logo.svg';
import MenuIcon from '../../media/MenuIcon.png';
import ModalContenedor from '../modal-contenedor/ModalContenedor';

const MenuBarra = ({ onReturn }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('Pagina principal');
  const [isRotated, setIsRotated] = useState(false); // Nuevo estado para la rotación

  const toggleModal = () => {
    setModalVisible(!modalVisible);
    setIsRotated(!isRotated); // Cambia el estado de la rotación
  };

  const handleButtonClick = (valor) => {
    setTitulo(valor);
    setIsRotated(!isRotated);
    setModalVisible(false);
    if (onReturn) {
      onReturn(valor);
    }
  };

  return (
    <div>
      <div className={styles.contenedor}>
        <img src={logo} alt="Mi Logo" className={styles.logo} />
        <h1 className={styles.titulo}>{titulo}</h1>
        <img
          src={MenuIcon}
          alt="Icono del menu"
          className={`${styles.icono} ${isRotated ? styles.rotated : ''}`}
          onClick={toggleModal}
        />
      </div>
      {modalVisible && <ModalContenedor onButtonClick={handleButtonClick} />}
    </div>
  );
};

export default MenuBarra;
