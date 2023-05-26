import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socioAxios from "../../config/axios";
import Alerta from "../../components/Alerta";

const ListaSocios = () => {
  const [socios, setSocios] = useState([]); //Arreglo original de socios
  const [sociosFiltrados, setSociosFiltrados] = useState([]); //Arreglo secundario, para no modificar el original
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/admin");
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;

    const sociosFiltrados = socios.filter(socio => 
      socio.nombreCompleto.toLowerCase().includes(inputValue.toLowerCase()) || 
      socio.dni.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSociosFiltrados(sociosFiltrados);
  }

  useEffect(() => {
    const obtenerSocios = async () => {
      try {
        const response = await socioAxios.get("/admin/socios");
        setSocios(response.data);
        setSociosFiltrados(response.data);
      } catch (error) {
        console.log(error);
        setAlerta({msg:"Fallo en la conexión, intentalo nuevamente",error:true});

      }
    };
    obtenerSocios();
  }, [])

  const { msg } = alerta;

  return (
    <div className="flex flex-col bg-sbc-login">
      <div className="h-20 bg-login-form shadow-lg items-center flex flex-row mb-4">
        <button
          className="w-16 h-16 left-5 absolute bg-sbc-yellow flex justify-center items-center rounded-full shadow-md"
          onClick={handleNavigation}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-left"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="5" y1="12" x2="11" y2="18" />
            <line x1="5" y1="12" x2="11" y2="6" />
          </svg>
        </button>
        <div className="w-full flex justify-center items-center">
          <p className="text-3xl text-slate-200 carter">Lista de Socios</p>
        </div>
      </div>

      <div className="w-11/12 mx-auto flex flex-col">
        <div className="bg-slate-300 rounded-t-lg">
          <div className="flex flex-row p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="35" height="35" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
            <input 
              className="text-lg px-2 ml-2 w-10/12 my-0.5 rounded focus:outline-yellow-500 sans-pro" 
              type="search" 
              placeholder="DNI o Nombre del socio"
              onChange={handleChange}
              />
          </div>
        </div>

        <table className="table-auto shadow-lg border w-full">
          <thead className="carter bg-yellow-400 text-cta-azul">
            <tr className="h-12">
              <th className="text-left pl-3">DNI</th>
              <th className="text-left pl-3">Nombre Completo</th>
              <th className="px-2">Cuotas</th>
            </tr>
          </thead>
          <tbody className="sans-pro ">
            {sociosFiltrados &&
              sociosFiltrados.map((socio, index) => (
                <tr className={`${socio.cuotasAdeudadas < 3 ? "bg-green-400" : "bg-red-400"} border-y border-slate-700 h-12 font-semibold`} key={index}>
                  <td className="pl-3">{socio.dni}</td>
                  <td className="pl-3">{socio.nombreCompleto}</td>
                  <td className="text-center font-extrabold text-xl">{socio.cuotasAdeudadas}</td>
                </tr>
              ))}
          </tbody>
        </table>
          { msg && 
              <Alerta  alerta={alerta} 
          />}
      </div>
    </div>
  );
};

export default ListaSocios;
