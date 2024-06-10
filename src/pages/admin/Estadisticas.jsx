import React, { useEffect, useState } from "react";
import GraficoBarra from "../../components/estadisticas/GraficoBarra";
import InputDate from "../../components/estadisticas/inputDate";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "../../config/axios";

const Estadisticas = () => {
  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);
  const [fechasErroneas, setFechasErroneas] = useState(false);
  const [fechasGrafico, setFechasGrafico] = useState([]);

  const navigate = useNavigate();

  const consultarVentasFinDeSemana = async () => {
    try {
      const respuestaAxios = await clienteAxios.post('/admin/ventasFinDeSemana', {fechaDesde, fechaHasta});
      setFechasGrafico(respuestaAxios.data);
      console.log(fechasGrafico)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    // Pone en true si algunas de las fechas estan vacias y deshabilita el boton
    setFechasErroneas(fechaDesde == null || fechaHasta == null);

    // if (fechaDesde > fechaHasta) {
    //   setFechasErroneas(true);
    //   toast.error(
    //     <span>
    //       Fechas incorrectas{" "}
    //       <span className="underline font-bold">
    //         Fecha desde debe ser menor que fecha hasta
    //       </span>
    //     </span>
    //   );
    // }
  }, [fechaDesde, fechaHasta]);

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 bg-login-form shadow-md w-full">
        <button
          className="w-14 h-14 left-3 top-3 absolute bg-sbc-yellow flex justify-center items-center rounded-full shadow-md"
          onClick={() => navigate("/admin")}
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
        <p className="text-center text-3xl text-blue-gray-50 carter">
          Estadisticas
        </p>
      </div>
      <div className="w-3/4 mx-auto mt-5">
        <InputDate setFecha={setFechaDesde} type="desde" />
        <InputDate setFecha={setFechaHasta} type="hasta" />
        <div className="p-5">
          <Button
            // loading={isLoading}
            disabled={fechasErroneas}
            color="blue"
            className="w-full mb-5 text-sm uppercase"
            onClick={consultarVentasFinDeSemana}
          >
            Consultar ventas
          </Button>
        </div>
        <GraficoBarra fechasGrafico={fechasGrafico} />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        pauseOnHover
      />
    </div>
  );
};

export default Estadisticas;
