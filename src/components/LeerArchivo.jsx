import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import clienteAxios from "../config/axios";
import SocioErroneo from "./SocioErroneo";
import Alerta from "./Alerta";
import useAuth from "../hooks/useAuth";
import BounceLoader from "react-spinners/BounceLoader";

function LeerArchivo() {
  const [socios1, setSocios1] = useState([]);
  const [estadoBoton, setEstadoBoton] = useState(true);
  const [sociosErroneo, setSociosErroneo] = useState([]); //Guarda los socios que tienen mal ingresado el dni, tambien recibe los socios con codigo duplicados del back
  const [alerta, setAlerta] = useState({});
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  const handleFileUpload = (e) => {

    setSociosErroneo([]);
    const archivo = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const hoja = workbook.Sheets[workbook.SheetNames[0]];
      const datos = XLSX.utils.sheet_to_json(hoja, { header: 1 });
      console.log(datos)

      const nuevosSocios1 = [];

      //! por que arranca en 1?;
      for (let i = 1; i < datos.length; i++) {
        const [codigo, nombreCompleto, cuotasAdeudadas, dni] = datos[i];

        if (!dni) {

          const nuevoErroneo = {
            nombreCompleto,
            dni
          }

          setSociosErroneo((prev) => [...prev, nuevoErroneo]); // agrega un nuevo socio erróneo al arreglo

        } else {
          nuevosSocios1.push({ codigo, nombreCompleto, cuotasAdeudadas, dni });
        }
      };

      setSocios1(nuevosSocios1);
    };

    reader.readAsBinaryString(archivo);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await clienteAxios.post('/admin/cargar-archivo', socios1);
      setAlerta({ msg: response.data.msg, error: false });
      setLoading(false);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        console.log(errorMessage);
        setAlerta({ msg: errorMessage, error: true });
      }
    }
  };

  useEffect(() => {
    //Primero pregunta si socios fue cargado, despues si hay socios mal cargados, y depende de si hay (socios erroneos o no) el cambio del Boton.
    if (socios1.length) {
      if (sociosErroneo.length > 0) {
        setEstadoBoton(true)
      } else {
        setEstadoBoton(false)
      }
    }
  }, [socios1, sociosErroneo])

  const { msg } = alerta;

  return (
    <>
      <div className="flex flex-row pb-1 bg-leer-archivo shadow-md w-full md-mb lg-mb se-mb justify-center">
        <h1
          className="text-3xl text-slate-200 carter px-6 my-5 sm:text-5xl">
          SUBIR ARCHIVO DE EXCEL
        </h1>
        <button
          className="text-slate-800 h-14 w-14 absolute right-8 top-4 rounded-full shadow-md bg-yellow-400"
          onClick={logout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-x" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="10" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
        </button>
      </div>

      <div className="w-full flex justify-center mt-8">
        <BounceLoader
          loading={loading}
          color="#0339A6"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>

      {msg &&
        <Alerta
          alerta={alerta}
        />
      }

      <div className="w-full mx-auto bg-slate-100 shadow-md my-8 py-8 rounded-md sm:w-11/12">
        <form onSubmit={handleSubmitForm} encType="multipart/form-data" className="flex flex-col justify-center items-center">
          <input
            type="file"
            accept=".xls"
            onChange={handleFileUpload}
            className="text-xl mx-auto my-3 sm:w-1/2 w-full px-3"
          />
          <button
            type="submit"
            disabled={estadoBoton}

            className="disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none bg-indigo-600 text-yellow-400 hover:bg-indigo-500 py-3 my-6 w-6/12 mx-auto rounded-xl transition-all shadow-md"
          >
            IMPORTAR SOCIOS
          </button>
        </form>

      </div>
      {
        sociosErroneo.length ?
          <div className="bg-yellow-200 border-zinc-800 border-2 mx-auto my-12 w-10/12">
            <h2 className="bg-yellow-300 text-2xl text-center py-3 font-bold">Listado de socios con DNI incorrecto</h2>
            <ul>
              {
                sociosErroneo &&
                sociosErroneo.map((socio, index) => (
                  <SocioErroneo key={index} socio={socio} />
                ))
              }
            </ul>
          </div>
          : null
      }
    </>
  );
}

export default LeerArchivo;