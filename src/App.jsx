// src/App.jsximport Titulo from "./componentes/Titulo";
import { useState } from "react";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Importar componente Encabezado.
import Encabezado from "./components/Navegacion/Encabezado";

//Importar las vistas.
import Login from "./Views/Login";
import Inicio from "./Views/Inicio";
import Categorias from "./Views/Categorias";
import Productos from "./Views/Productos";
import Catalogo from "./Views/Catalogo";
import Clientes from './Views/Clientes';
import Empleados from './Views/Empleados';
import Usuarios from './Views/Usuarios';
import Ventas from './Views/Ventas';

//Importar archivo de estilos.
import "./App.css";

const App = () => {
  return (
    <Router>
      <Encabezado />
      <main className="margen-superior-main">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/ventas" element={<Ventas />} />
          
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

