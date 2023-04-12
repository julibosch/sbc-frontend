import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import clienteAxios from "../../config/axios";
import SocioErroneo from "../../components/SocioErroneo";
import Alerta from "../../components/Alerta";

function LeerArchivo() {
  const [socios1, setSocios1] = useState([]);
  const [socios2, setSocios2] = useState([]);
  const [estadoBoton, setEstadoBoton] = useState(true);
  const [sociosErroneo, setSociosErroneo] = useState([]); //Guarda los socios que tienen mal ingresado el dni
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const archivo = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const hoja = workbook.Sheets[workbook.SheetNames[0]];
      const datos = XLSX.utils.sheet_to_json(hoja, { header: 1 });

      const nuevosSocios1 = [];
      const nuevosSocios2 = [];

      //! DUDA SOBRE ESTO, y si son impares que pasa? toma uno demas o uno menos en la division?
      const primeraMitad = parseInt(datos.length / 2);

      // Recorre los datos de la hoja y crea un objeto para cada socio
      for (let i = 1; i < primeraMitad; i++) {
        const [codigo, nombreCompleto, cuotasAdeudadas, dni] = datos[i];

        if (!dni || dni.length > 8 || dni.length < 8) {

          const nuevoErroneo = {
            nombreCompleto,
            dni
          }

          setSociosErroneo((prev) => [...prev, nuevoErroneo]); // agrega un nuevo socio erróneo al arreglo

        } else {

          nuevosSocios1.push({ codigo, nombreCompleto, cuotasAdeudadas, dni });
        }
      };

      for (let i = primeraMitad; i < datos.length; i++) {
        const [codigo, nombreCompleto, cuotasAdeudadas, dni] = datos[i];

        if (!dni || dni.length > 8 || dni.length < 8) {

          const nuevoErroneo = {
            nombreCompleto,
            dni
          }

          setSociosErroneo((prev) => [...prev, nuevoErroneo]); // agrega un nuevo socio erróneo al arreglo

        } else {

          nuevosSocios2.push({ codigo, nombreCompleto, cuotasAdeudadas, dni });
        }
      };

      setSocios1(nuevosSocios1);
      setSocios2(nuevosSocios2);
    };

    reader.readAsBinaryString(archivo);

  };

  const sendData = async (socios) => {
    try {
      const response = await clienteAxios.post('/admin/cargar-archivo', socios);
      setAlerta({ msg: response.data.msg, error: false });
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitClick = async () => {
    try {
      const promise1 = sendData(socios1);
      const promise2 = sendData(socios2);
      await Promise.all([promise1, promise2]);
      console.log('Ambas solicitudes POST se completaron exitosamente');
    } catch (error) {
      console.log(error);
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
      <h1
        className="font-bold text-5xl text-yellow-400 text-center bg-indigo-900 py-6 mb-5">
        SUBIR ARCHIVO DE EXCEL
      </h1>

      {msg &&
        <Alerta
          alerta={alerta}
        />
      }

      <div className="w-11/12 mx-auto">
        <div className="flex flex-col">
          <input
            type="file"
            accept=".xls"
            onChange={handleFileUpload}
            className="text-xl mx-auto my-3"
          />
          <button
            type="submit"
            disabled={estadoBoton}
            onClick={handleSubmitClick}
            className="disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed bg-indigo-600 text-yellow-400 hover:bg-indigo-500 py-3 my-6 w-6/12 mx-auto rounded-xl transition-all"
          >
            IMPORTAR LISTA DE SOCIOS
          </button>
        </div>

        {
          sociosErroneo.length ?
            <div className="bg-yellow-200 border-zinc-800 border-2 my-5">
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
      </div>
    </>
  );
}

export default LeerArchivo;