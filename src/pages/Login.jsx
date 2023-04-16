import { useEffect, useRef, useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from "../config/axios";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const Login = () => {
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const apellido = useRef();
  const dni = useRef();

  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validacion de Apellido y DNI
    if (apellido.current.value === '' || dni.current.value === '') {
      return setAlerta({ msg: "Por favor, rellena todos los campos", error: true });
    };

    setAlerta({});

    //Manda la info al Back
    try {
      const url = "/login";
      const data = {
        apellido: apellido.current.value,
        dni: dni.current.value
      };
      
      // Post al back
      const response = await clienteAxios.post(url, data);
      
      // Se destructura la info del socio
      const tipoUsuario = response.data.tipoUsuario;
      const id = response.data._id;

      // Se almacena la info en el localStorage
      const socioData = {tipoUsuario, id};
      localStorage.setItem("socioData", JSON.stringify(socioData));
      
      //Actualiza para poder navegar hacia el perfil.
      setAuth( socioData )

      // Se redirecciona dependiendo del tipoUsuario
      if(tipoUsuario === 'admin') {
        navigate('/admin')
      } else {
        navigate(`/perfil/${id}`)
      };

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
      console.log(error)
    }
  };

  const { msg } = alerta;

  return (
    <div className=' bg-gradient-to-b from-sbc-blue to-blue-600 h-screen texture'>
      <div className="pt-6 px-8 pb-4 md-mb md-mb2 mb-4 w-full mx-auto shadow-md separator">
        <h2 className="text-xl text-center text-yellow-300 carter separator-text">Inicia sesión para ver tu cuenta de <span className='text-sbc-yellow underline underline-offset-2'>SOCIO</span></h2>
      </div>

      {/* Escudo */}
      <div className='w-full h-44 md-escudo flex justify-center md-mb'>
        <img className='h-full drop-shadow-2xl' src="../../escudo-sbc.png" alt="Escudo SBC"/>
      </div>

      <div className="w-5/6 mx-auto">
        <form className="bg-login-form shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="sans-pro block text-slate-100 font-normal text-lg" htmlFor="apellido">
              Apellido
            </label>
            <input autoComplete='off' ref={apellido} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-slate-300" id="apellido" type="text" placeholder="Ingresa tu Apellido" />
          </div>
          <div className="mb-6">
            <label className="sans-pro block text-slate-100 font-normal text-lg" htmlFor="dni">
              DNI
            </label>
            <input ref={dni} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-slate-300" id="dni" type="number" pattern="\d*" inputMode="numeric" placeholder="Ingresa tu DNI" />
          </div>

          {msg && <Alerta
            alerta={alerta}
          />}

          <div className="flex items-center justify-between">
            <button className="carter w-full bg-sbc-yellow hover:bg-yellow-600 text-cta-azul font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text text-lg" type="submit">
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login;