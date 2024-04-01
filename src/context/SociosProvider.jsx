import React, { createContext, useContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const SociosContext = createContext();

export const useSocios = () => {
  const context = useContext(SociosContext);
  if (!context) {
      throw new Error("useSocios debe estar dentro del proveedor SociosContext");
  }
  return context;
};

const SociosProvider = ({children}) => {
  const [socios, setSocios] = useState([]);
  const [sociosFiltrados, setSociosFiltrados] = useState([]);

  const listadoSocios = async () => {
    try {
      const responseAxios = await clienteAxios.get('/admin/socios');
      setSocios(responseAxios.data);
      return;
    } catch (error) {
      return error
    }
  }
  
  useEffect(() => {
    listadoSocios();
  }, [])
  
  useEffect(() => {
    setSociosFiltrados(socios)
  }, [socios])
  
  

  return (
    <SociosContext.Provider value={{socios, sociosFiltrados, setSociosFiltrados}}>{children}</SociosContext.Provider>
  )
}

export default SociosProvider