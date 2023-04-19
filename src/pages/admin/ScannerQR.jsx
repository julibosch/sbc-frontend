import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useZxing } from 'react-zxing';
import socioAxios from '../../config/axios';
import Alerta from '../../components/Alerta';

const ScannerQR = () => {
  const [result, setResult] = useState('');
  const [estado, setEstado] = useState(''); //Se Muestra una clase u otra dependiendo si adeuda o al dia.
  const [data, setData] = useState({});  //Guarda la data de lo que viene del back
  const [pause, setPause] = useState(false); //Pausa la camara
  const [alerta, setAlerta] = useState({}); //Mensaje de alerta
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
    paused: pause
  });

  const navigate = useNavigate();

  const handleNavigation = () => {
    setPause(true);
    navigate('/admin');
  };

  useEffect(() => {
    if (result === '') return;

    const data = JSON.parse(result);
    const url = '/admin/scanner-qr';

    const devolverSocio = async () => {
      try {
        const socio = await socioAxios.post(url, data);
        setData(socio.data);
        if (socio.data.cuotasAdeudadas >= 3) {
          setEstado('deuda');
          console.log(socio.data.cuotasAdeudadas);
        } else {
          setEstado('al dia');
          console.log(socio.data.cuotasAdeudadas);
        };
      } catch (error) {
        console.log(error)
        return setAlerta({ msg: error.socio.data.msg, error: true });
      }
      //En caso de que no salga por el catch
      setAlerta({});
    };
    devolverSocio();

  }, [result])

  const { msg } = alerta;

  return (
    <>
      <div className='flex flex-col gap-4 h-screen pb-14'>
        <div className='bg-login-form h-24 flex items-center justify-center shadow-md'>
          <button
            className='w-16 h-16 left-5 absolute bg-sbc-yellow flex justify-center items-center rounded-full shadow-md'
            onClick={handleNavigation}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="55" height="55" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="5" y1="12" x2="11" y2="18" />
              <line x1="5" y1="12" x2="11" y2="6" />
            </svg>
          </button>
          <h2 className='text-center font-normal carter text-4xl uppercase text-slate-200 ml-5'>scanner</h2>
        </div>

        <div className='w-3/4 h-72 flex justify-center mx-auto'>
          <video ref={ref} style={{ width: '16rem', height: '16rem' }}/>
        </div>

        {Object.keys(data).length !== 0 ?
          <div className={`${estado === 'deuda' ? 'bg-red-300' : 'bg-green-300'} w-3/4 h-44 mx-auto flex flex-col items-center transition-all`}>
            <div className={`${estado === 'deuda' ? 'bg-red-500' : 'bg-green-500'} w-full h-12 flex justify-center items-center text-center text-xl uppercase font-bold transition-all`}>
              {msg && <Alerta
                alerta={alerta}
              />}
              <p className='uppercase font-bold text-3xl sans-pro'>{estado}</p>
            </div>
            <div className='flex flex-col items-center gap-5'>
              <p className='mt-6 text-2xl font-bold uppercase sans-pro'>{data.nombreCompleto}</p>
              <p><span className='font-bold'>Cuotas Adeudadas: </span> <span className='text-xl font-bold '>{data.cuotasAdeudadas}</span></p>
              <p></p>
            </div>
          </div>
          :
          <div className='w-3/4 h-44 mx-auto flex flex-row justify-center items-center bg-qr h-min-fit p-2'>
            <p className='text-center font-bold w-full text-xl'>Aún no se ha escaneado ningun QR!</p>
          </div>}
      </div>
    </>
  )
}

export default ScannerQR;