import React from 'react';
import styles from './ModalContenedor.module.css';

const ModalContenedor = ({ onButtonClick }) => {
  return (
    <div className={styles.contenedor}>
      <div style={{ height: '2px', width: '100%', backgroundColor: '#ffff' }}></div>
      <span className={styles.botones} onClick={() => onButtonClick('Pagina principal')}>
        Pagina principal
      </span>
      <span className={styles.botones} onClick={() => onButtonClick('Menú')}>
        Menú
      </span>
    </div>
  );
};

export default ModalContenedor;
