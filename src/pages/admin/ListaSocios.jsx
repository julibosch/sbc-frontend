import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../../components/Alerta";
import BounceLoader from "react-spinners/BounceLoader";
import { FixedSizeList } from "react-window";
import { useSocios } from "../../context/SociosProvider";
import FiltroSocios from "../../components/FiltroSocios";

const ListaSocios = () => {
  const [alerta, setAlerta] = useState({});
  const [loading, setLoading] = useState(false);
  const { socios, sociosFiltrados, setSociosFiltrados } = useSocios();

  const navigate = useNavigate();

  const Socio = ({ index, style }) => (
    <li
      className={`${sociosFiltrados[index].cuotasAdeudadas < 3 ? "bg-green-400" : "bg-red-400"} border-y border-blue-gray-800 text-sm flex items-center font-semibold`}
      key={sociosFiltrados[index]._id}
      style={style}
    >
      <p className="w-[25%] text-left pl-2">{sociosFiltrados[index].dni}</p>
      <p className="w-[55%] text-left">{sociosFiltrados[index].nombreCompleto}</p>
      <p className="w-[20%] text-center font-bold text-lg">{sociosFiltrados[index].cuotasAdeudadas}</p>
    </li>
  );

  const { msg } = alerta;

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 bg-login-form shadow-md w-full">
        <button
          className="w-14 h-14 left-3 top-3 absolute bg-sbc-yellow flex justify-center items-center rounded-full shadow-md"
          onClick={() => navigate('/admin')}
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
        <p className="text-center text-3xl text-blue-gray-50 carter">Lista de Socios</p>
      </div>

      <div className="w-11/12 mx-auto flex flex-col mt-3">
       <FiltroSocios setSociosFiltrados={setSociosFiltrados} socios={socios}/>

        <ul className="flex flex-col">
          <li className="flex carter bg-yellow-400 text-cta-azul items-center py-3 border-b">
            <p className="w-[25%] pl-2">DNI</p>
            <p className="w-[55%]">Nombre Completo</p>
            <p className="w-[10%]">Cuotas</p>
          </li>

          {sociosFiltrados.length > 0 ? (
            <FixedSizeList
              className="mx-auto overflow-x-scroll rounded-lg"
              width={"100%"}
              height={410}
              itemCount={sociosFiltrados.length}
              itemSize={45}
            >
              {Socio}
            </FixedSizeList>
          ) : sociosFiltrados.length == 0 ? (
            <li className="bg-red-200">
              <p className="px-6 py-4 text font-semibold text-gray-900 whitespace-nowrap">
                No existe el socio con la búsqueda utilizada
              </p>
            </li>
          ) : (
            <li className="bg-red-200">
              <p className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                No hay ningún socio, cargue uno
              </p>
            </li>
          )}
        </ul>
        {loading &&
          <BounceLoader
            className="mx-auto"
            loading={loading}
            color="#F2CB05"
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }

        {msg &&
          <Alerta alerta={alerta} />
        }
      </div>
    </div>
  );
};

export default ListaSocios;
