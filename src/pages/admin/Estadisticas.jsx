import React, { useEffect, useState } from "react";
import InputDate from "../../components/estadisticas/inputDate";
import { Button } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import clienteAxios from "../../config/axios";
import GraficoTorta from "../../components/estadisticas/GraficoTorta";
import BotonVolver from "../../components/BotonVolver";
import { parse, startOfDay, isAfter } from "date-fns";

const Estadisticas = () => {
  const [fechaDesde, setFechaDesde] = useState(null);
  const [fechaHasta, setFechaHasta] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [fechasErroneas, setFechasErroneas] = useState(false);
  const [fechasGrafico, setFechasGrafico] = useState([]);

  const consultarVentasFinDeSemana = async () => {
    try {
      setCargando(true);
      const respuestaAxios = await clienteAxios.post(
        "/admin/consultar-ventas-fechas",
        { fechaDesde, fechaHasta }
      );
      setFechasGrafico(respuestaAxios.data);
      setCargando(false);
    } catch (error) {
      setCargando(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!fechaDesde || !fechaHasta) {
      setFechasErroneas(true);
      return;
    }

    // Usa date-fns para parsear las fechas y obtener solo día, mes y año
    const fechaDesdeDate = startOfDay(
      parse(fechaDesde, "d/M/yyyy", new Date())
    );
    const fechaHastaDate = startOfDay(
      parse(fechaHasta, "d/M/yyyy", new Date())
    );

    if (isAfter(fechaDesdeDate, fechaHastaDate)) {
      setFechasErroneas(true);
      toast.error(
        <span>
          Fechas incorrectas{" "}
          <span className="underline font-bold">
            Fecha desde debe ser menor que fecha hasta
          </span>
        </span>
      );
    } else {
      setFechasErroneas(false);
    }
  }, [fechaDesde, fechaHasta]);

  return (
    <div className="flex flex-col h-full">
      <div className="py-6 bg-login-form shadow-md w-full">
        <BotonVolver />
        <p className="text-center text-3xl text-blue-gray-50 carter">
          Estadisticas
        </p>
      </div>
      <div className="w-3/4 mx-auto mt-5">
        <InputDate setFecha={setFechaDesde} type="desde" />
        <InputDate setFecha={setFechaHasta} type="hasta" />
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
          <GraficoTorta
            fechasGrafico={fechasGrafico}
            fechaDesde={fechaDesde}
            fechaHasta={fechaHasta}
          />
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
