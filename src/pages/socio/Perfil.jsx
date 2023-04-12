import { useParams } from 'react-router-dom';
import { useState } from 'react';
import QRcode from "qrcode.react";
import socioAxios from '../../config/axios';
import useAuth from '../../hooks/useAuth';

const Perfil = () => {
  const [nombreSocio, setNombreSocio] = useState('');
  const params = useParams();
  const { cerrarSesion } = useAuth();

  const dataSocio = { id: params.id };
  const datosQR = JSON.stringify(dataSocio)

  const obtenerSocio = async () => {

    try {
      const url = `/perfil/${params.id}`
      const response = await socioAxios.get(url)
      const { nombreCompleto } = response.data;
      setNombreSocio(nombreCompleto);

    } catch (error) {
      console.log(error)
    }
  }

  obtenerSocio()

  return (
    <div className="flex flex-col">
      <div className='flex flex-row h-1/3 bg-indigo-300 p-8 pb-32'>
        <div>
          <p className=" text-4xl font-bold ">Tu CLUB </p>
          <p className=" text-4xl font-bold ">Tu ORIGEN </p>
          <p className=" text-4xl font-bold ">Tu CASA </p>
        </div>
        <button
          className="text-slate-800 rounded-full w-16 h-16 ml-16 font-bold shadow-md text-2xl bg-red-300"
          onClick={cerrarSesion}
        >X</button>
      </div>
      <div className=" absolute bg-indigo-800 w-1/2 h-48 left-1/4 top-1/4" >
        <QRcode value={datosQR} size={200} style={{ width: "100%" }} />
      </div>
      <div className="p-8 pt-44 text-center">
        <p className="text-4xl font-bold mb-20">{nombreSocio}</p>
        <p className=" bg-yellow-200 shadow-lg border border-yellow-400 h-12 text-xl leading-10 font-bold mb-20" >Mostra tu QR en la entrada</p>
      </div>
    </div>
  )
}

export default Perfil