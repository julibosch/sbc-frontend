import { useParams } from 'react-router-dom';
import { useState } from 'react';
import QRcode from "qrcode.react";
import socioAxios from '../../config/axios';
import useAuth from '../../hooks/useAuth';

const Perfil = () => {
  const [nombreSocio, setNombreSocio] = useState('');
  const params = useParams();
  const { logout } = useAuth();

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
      <div className='flex flex-row h-1/3 p-8 md-mb lg-mb se-mb'>
        <div className='pacifico tracking-widest text-sbc-yellow'>
          <p className="se-text text-5xl font-light mb-2">Tu club </p>
          <p className="se-text text-5xl font-light mb-2">Tu origen </p>
          <p className="se-text text-5xl font-light mb-2">Tu casa </p>
        </div>
        <button
          className="text-slate-800 h-14 w-14 absolute right-8 rounded-full shadow-md bg-yellow-400"
          onClick={logout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="10" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
        </button>
      </div>

      <div className='py-4 md-mb se-qr-mb lg-py lg-qr lg-mb bg-qr w-3/4 mx-auto shadow-md rounded-xl'>
        <div className="mx-auto w-48 h-48">
          <QRcode value={datosQR} size={200} style={{ width: "100%" }} />
        </div>

        <div className="mt-8 text-center">
          <p className="text-4xl carter">{nombreSocio}</p>
        </div>
      </div>
      
      <div className='relative w-4/5 flex flex-row items-center h-14 bg-red-200 mx-auto shadow-md border border-pink-300 mt-8 rounded-full'>
        <svg className='se-icon' xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-help" width="55" height="55" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="#e74848" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="17" x2="12" y2="17.01" />
          <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
        </svg>
        <p className="-ml-3 grow sans-pro italic text-center text-xl font-bold" >Mostrá tu QR en la entrada</p>
      </div>
    </div>
  )
}

export default Perfil