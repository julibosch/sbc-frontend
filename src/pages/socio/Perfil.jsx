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
      <div className='flex flex-row h-1/3 p-8 pb-32'>
        <div className='pacifico tracking-widest text-sbc-yellow'>
          <p className=" text-5xl font-light mb-2">Tu club </p>
          <p className=" text-5xl font-light mb-2">Tu origen </p>
          <p className=" text-5xl font-light">Tu casa </p>
        </div>
        <button
          className="text-slate-800 absolute right-8 rounded-full shadow-md bg-yellow-400"
          onClick={cerrarSesion}
        >
          <svg className='h-16 w-16' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="10" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
        </button>
      </div>

      <div className="-mt-16 mx-auto w-48 h-48" >
        <QRcode value={datosQR} size={200} style={{ width: "100%" }} />
      </div>

      <div className="p-8 text-center">
        <p className="text-4xl mb-20 carter se">{nombreSocio}</p>
        <p className="se bg-yellow-200 shadow-lg border border-yellow-400 h-12 text-xl leading-10 font-bold mb-20" >Mostra tu QR en la entrada</p>
      </div>
    </div>
  )
}

export default Perfil