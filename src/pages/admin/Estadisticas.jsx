import React, { useEffect, useState } from "react";
import InputDate from "../../components/estadisticas/inputDate";
import { Button } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "../../config/axios";
import GraficoTorta from "../../components/estadisticas/GraficoTorta";
import BotonVolver from "../../components/BotonVolver";
import { addDays, format, startOfDay, endOfDay } from "date-fns";

const Estadisticas = () => {
  const [range, setRange] = useState({ from: null, to: null });
  const [rangeFormateado, setRangeFormateado] = useState({ from: '', to: '' });
  const [cargando, setCargando] = useState(false);
  const [fechasErroneas, setFechasErroneas] = useState(false);
  const [fechasGrafico, setFechasGrafico] = useState([]);

  const consultarVentasFinDeSemana = async () => {
    try {
      setCargando(true);
      const respuestaAxios = await clienteAxios.post(
        "/admin/consultar-ventas-fechas",
        { rangeFormateado }
      );
      setFechasGrafico(respuestaAxios.data);
      setCargando(false);
    } catch (error) {
      setCargando(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!range || !range.from || !range.to) {
      setFechasErroneas(true);
      return;
    }

    const fromStartOfDay = startOfDay(new Date(range.from));
      const toEndOfDay = endOfDay(new Date(range.to));

      setRangeFormateado({
        from: format(fromStartOfDay, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        to: format(toEndOfDay, "yyyy-MM-dd'T'HH:mm:ssxxx")
      });
      setFechasErroneas(false);
    }, [range]);
    
    console.log(rangeFormateado)
  return (
    <div className="flex flex-col h-full">
      <div className="py-6 bg-login-form shadow-md w-full">
        <BotonVolver />
        <p className="text-center text-3xl text-blue-gray-50 carter">
          Estadisticas
        </p>
      </div>
      <div className="w-3/4 mx-auto mt-5">
        <InputDate range={range} setRange={setRange} />
        <div className="p-5">
          <Button
            loading={cargando}
            disabled={fechasErroneas}
            color="blue"
            className="w-full mb-5 text-sm uppercase"
            onClick={consultarVentasFinDeSemana}
          >
            Consultar ventas
          </Button>
        </div>
        <div className="w-full flex justify-center items-center mb-10">
          <GraficoTorta fechasGrafico={fechasGrafico} range={range} />
        </div>
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
