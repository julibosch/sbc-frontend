import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socioAxios from "../../config/axios";

const ListaSocios = () => {
  const [socios, setSocios] = useState([]);

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/admin");
  };

  useEffect(() => {
    const obtenerSocios = async () => {
      try {
        const response = await socioAxios.get("/admin/socios");
        setSocios(response.data);
      } catch (error) {
  
      }
    };
    obtenerSocios();

  } ,[])
  
  return (
    <div className="flex flex-col bg-sbc-login">
      <div className="h-20 bg-indigo-900 shadow-lg items-center flex flex-row mb-4">
        <button
          className="w-16 h-16 left-2 absolute bg-indigo-700 flex justify-center items-center rounded-full shadow-md"
          onClick={handleNavigation}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-left"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ffbf00"
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
          <p className="text-3xl font-bold text-yellow-400 ">Lista de Socios</p>
        </div>
      </div>

      <div className="mb-4 bg-slate-300">
        <p>BARRA DE BUSQUEDA</p>
      </div>

      <table className="w-11/12 mx-auto table-auto">
        <thead className="bg-blue-400">
          <tr>
            <th>DNI</th>
            <th>Nombre Completo</th>
            <th>Cuotas</th>
          </tr>
        </thead>
        <tbody>
          {socios &&
            socios.map(() => (
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaSocios;
