import React, { useState } from 'react';
import MenuBarra from './componentes/menu-barra/MenuBarra';
import Menu from './paginas/menu/Menu';
import PaginaPrincipal from './paginas/pagina-principal/PaginaPrincipal';

function App() {
  const [paginaActual, setPaginaActual] = useState('PaginaPrincipal');

  const cambiarPagina = (pagina) => {
    if(pagina === "Pagina principal")
    {
      setPaginaActual("PaginaPrincipal");
    }
    else if(pagina === "Menú")
    {
      setPaginaActual("Menu");
    }
  };
  return (
    <div>
      <MenuBarra onReturn={cambiarPagina}/>
      {paginaActual === 'PaginaPrincipal' ? <PaginaPrincipal /> : <Menu />}
    </div>
  );
}

export default App;
