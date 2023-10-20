import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import moment from 'moment-timezone';

const firebaseConfig  = {

    apiKey: "AIzaSyC82gw9YSIxqyfhvXhDjklgfj19rVESPRk",
  
    authDomain: "lacrepe-dce46.firebaseapp.com",
  
    databaseURL: "https://lacrepe-dce46-default-rtdb.firebaseio.com",
  
    projectId: "lacrepe-dce46",
  
    storageBucket: "lacrepe-dce46.appspot.com",
  
    messagingSenderId: "28061756023",
  
    appId: "1:28061756023:web:8ab60980f543706fda3472"
  
  };
const app = initializeApp(firebaseConfig);

// Función para obtener el menú
export const getMenuData = async () => {
  try {
    const dbRef = ref(getDatabase(app));
    const snapshot = await get(child(dbRef, 'Menu'));

    if (snapshot.exists()) {snapshot.val();
      return snapshot.val();
    } else {
      console.log('No data available');
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function getDominicanTime() {
  const timeZone = 'America/Santo_Domingo'; // Zona horaria de la República Dominicana
  const currentMoment = moment().tz(timeZone);

  const date = {
    fecha: currentMoment.format('YYYY-MM-DD'),
    hora: currentMoment.format('HH-mm-ss'),
  };

  return date;
}


export function sendOrderToDatabase(order, Total, nombre, comentario) {
  const db = getDatabase(app);
  const dominicanTime = getDominicanTime(); // Obtiene la hora y la fecha de la República Dominicana

  // Genera un código único de 4 caracteres
  const code = generateUniqueCode();

  // Construye la referencia personalizada en función de la fecha y el código
  const customRef = ref(db, `Ordenes/${dominicanTime.fecha}/${dominicanTime.hora}-${code}`);

  const orderData = {
    ...order,
    hora: dominicanTime.hora,
    estado: true,
    total: Total,
    nombre: nombre,
    comentario: comentario,
  };

  set(customRef, orderData); // Guarda la orden en la referencia personalizada

  return dominicanTime.hora + '-' + code; // Devuelve el nombre del objeto personalizado
}


function generateUniqueCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

