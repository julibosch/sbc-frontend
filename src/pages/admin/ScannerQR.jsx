import React, { useState, useEffect } from 'react';
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
        return setAlerta({ msg: error.socio.data.msg, error:true });
      }
      //En caso de que no salga por el catch
      setAlerta({});
    };
    devolverSocio();

  }, [result])

  const { msg } = alerta;

  return (
    <>
      <div className='flex flex-col justify-center'>
        <div className='bg-indigo-800 text-yellow-400 text-3xl font-bold uppercase h-16 flex items-center justify-center'>
          <h2 className='text-center'>scanner qr</h2>
        </div>

        <div className='w-3/4 mx-auto mt-14'>
          <video ref={ref} />
        </div>

        {Object.keys(data).length !== 0 ?
          <div className={`${estado === 'deuda' ? 'bg-red-400' : 'bg-green-400'} w-3/4 h-52 mx-auto mt-12 flex flex-col items-center`}>
            <div className={`${estado === 'deuda' ? 'bg-red-500' : 'bg-green-500'} w-full h-10 flex justify-center items-center text-center text-xl uppercase font-bold`}>
              {msg && <Alerta
              alerta={alerta}
            />}
              <p>resultado</p>
            </div>
            <div className='flex flex-col items-center gap-5'>
              <p className='mt-6 text-2xl font-bold'>{data.nombreCompleto}</p>
              <p><span className='font-bold'>Cuotas Adeudadas: </span> <span className='text-xl font-bold '>{data.cuotasAdeudadas}</span></p>
              <p className='uppercase font-black text-xl'>{estado}</p>
              <p></p>
            </div>
          </div>
          :
          <div className='mt-28 w-3/4 mx-auto flex flex-row justify-center items-center bg-slate-400 h-52'>
            <p className='text-center font-bold w-full text-2xl'>Escanee un QR para mostrar resultados!</p>
          </div>}
      </div>
    </>
  )
}

export default ScannerQR;