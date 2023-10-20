import React, { useEffect, useState } from 'react';
import styles from './Menu.module.css';
import CartaLista from '../../componentes/carta-lista/CartaLista';
import { getMenuData, sendOrderToDatabase } from '../../api/Firebase.js';

const Menu = () => {
  const [menuDatos, setMenuDatos] = useState(null);
  const [total, setTotal] = useState(0);
  const [pedido, setPedido] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre
  const [comentario, setComentario] = useState('');
  const [mostrarOverlay, setMostrarOverlay] = useState(false); // Estado para mostrar el overlay
  const [resetComponent, setResetComponent] = useState(false);

  const handleNombreChange = (event) => {
    // Actualizar el estado 'nombre' al cambiar el valor del campo de texto
    setNombre(event.target.value);
  };
  const handleComentarioChange = (event) => {
    // Actualizar el estado 'comentario' al cambiar el valor del campo de comentario
    setComentario(event.target.value);
  };
  useEffect(() => {
    getMenuData()
      .then((menuData) => {
        if (menuData) {
          const Datos = [];
          for (const key in menuData) {
            const cartas = [];
            for (const keyA in menuData[key]) {
              if (keyA !== 'modo') {
                cartas.push({
                  titulo: keyA,
                  modo: menuData[key].modo,
                  precio: menuData[key][keyA].precio,
                  logo: menuData[key][keyA].logo,
                });
              }
            }

            Datos.push({
              titulo: key,
              cartas: cartas,
            });
          }
          setMenuDatos(Datos);
        } else {
          console.log('No se pudo obtener el menú.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Función para manejar el cambio de valor en los componentes CartaLista
  const handleValueChange = (value) => {
    const pedidoC = [...pedido];

    // Buscar si ya existe un objeto con el mismo nombre en el arreglo
    const existingIndex = pedidoC.findIndex((item) => item.categoria === value.categoria);

    if (existingIndex !== -1) {
      // Si el objeto ya existe, actualiza sus propiedades
      pedidoC[existingIndex] = value;
    } else {
      // Si el objeto no existe, agrégalo al arreglo
      pedidoC.push(value);
    }
    setPedido(pedidoC);
    setTotal(pedidoC.reduce((totalSuma, item) => totalSuma + item.total, 0));
  };
  const mostrarFormularioHandler = () => {
    if (pedido.length === 0) {
      // El pedido está vacío, muestra un mensaje de error
      alert('No se puede realizar un pedido sin productos agregados');
    } else {
      setMostrarFormulario(true);
    }
  };
  const cerrarFormulario = () => {
    setMostrarFormulario(false);
  };
  const EnviarPedido = () => {
    if (!nombre) {
      // Mostrar una alerta si el nombre está vacío
      alert("Debes ingresar un nombre para enviar el pedido.");
    } else {
      // Mostrar el overlay antes de enviar el pedido
      setMostrarOverlay(true);

      setTimeout(() => {
        sendOrderToDatabase(pedido, total, nombre, comentario);
        setPedido([]); // Reiniciar el pedido
        setTotal(0); // Reiniciar el total
        setMostrarFormulario(false); // Cerrar el formulario
        setNombre(''); // Reiniciar el nombre
        setComentario(''); // Reiniciar el comentario
        setMostrarOverlay(false); // Ocultar el overlay
        setResetComponent(true); // Reiniciar el componente
      }, 1000);
      setResetComponent(false);
    }
  };


  return (
    <div key={resetComponent ? "reset" : "menu"}>
      <div className={styles.contenedor}>
        <div className={styles.SubContenedor}>
          {menuDatos ? (
            menuDatos.map((menu, index) => (
              <CartaLista
                key={index}
                OBJ={menu}
                onValueChange={handleValueChange}
              />
            ))
          ) : (
            <p>Cargando datos del menú...</p>
          )}
        </div>
        <h2>Total: {total} DOP</h2>
      </div>
      <button className={styles.BtmContenedor} onClick={mostrarFormularioHandler}>
        Realizar orden
      </button>
      {mostrarFormulario && (
        <div className={styles.overlay}>
          <div className={styles.formcontainer}>
            <button style={{ backgroundColor: 'transparent', border: '0px', marginLeft: '85%' }} className={styles.cerrarFormulario} onClick={cerrarFormulario}>
              Cerrar
            </button>
            <form>
              {/* Mostrar el desglose del pedido */}
              {pedido.map((categoria, index) => (
                <div key={index} style={{ margin: '10px 0' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{categoria.categoria}</h3>
                  {categoria.resumen.map((item, itemIndex) => (
                    <div key={itemIndex} style={{ margin: '5px 0' }}>
                      <p style={{ fontWeight: 'bold' }}>{item.nombre}</p>
                      <p>Cantidad: {item.cantidad}</p>
                      <p>Precio Total: {item.total}</p>
                    </div>
                  ))}
                  <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    Total de la categoría: {categoria.total}
                  </p>
                </div>
              ))}
            </form>
            <div style={{ width: '100%', backgroundColor: '#485A90', height: '3px', margin: '40px 0 0 0' }} />
            <h3 style={{ fontSize: '12px', fontWeight: 'lighter' }}>Nombre</h3>
            <textarea
              style={{ width: '100%', height: '20px' }}
              placeholder="Escribe tu nombre aquí"
              value={nombre} // Enlazar el valor del textarea al estado 'nombre'
              onChange={handleNombreChange} // Manejar cambios en el campo de texto
            />
            <h3 style={{ fontSize: '12px', fontWeight: 'lighter' }}>Comentario</h3>
            <textarea
              style={{ width: '100%', minHeight: '100px' }}
              placeholder="Escribe tu comentario aquí"
              value={comentario}
              onChange={handleComentarioChange}
            />
            <button
              className={styles.BtmContenedorForm}
              onClick={EnviarPedido}
            >
              Enviar pedido
            </button>

          </div>
        </div>
      )}



      {mostrarOverlay && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <img style={{ height: '70%', width: '70%' }} src="https://storage.googleapis.com/lacrepe-dce46.appspot.com/pulgares-arriba.png" alt="Imagen de carga" />
          </div>
        </div>
      )}

    </div>
  );
};

export default Menu;