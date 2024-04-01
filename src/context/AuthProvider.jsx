import { useState, useEffect, createContext } from 'react';
import clienteAxios from "../config/axios";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [idUsuario, setIdUsuario] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [SocioNoExiste, setSocioNoExiste] = useState("");

  const navigate = useNavigate();

  //Cuando se monta el componente solamente, Verifica si hay datos en el storage y los guarda en los useState
  useEffect(() => {
    //Trae los datos del localStorage
    const storedIdUsuario = localStorage.getItem('idUsuario');
    const storedTipoUsuario = localStorage.getItem('tipoUsuario');
    const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

    //aca entra cuando recargas la pagina. Si las variables de arriba trajeron algo del localStorage las setea a los UseState.
    if (storedIsLoggedIn && storedTipoUsuario) {
      setIdUsuario(storedIdUsuario);
      setTipoUsuario(storedTipoUsuario);
      setIsLoggedIn(storedIsLoggedIn);
    }
  }, []);

  //Esto sucede cuando se hace el login y se recarga la pagina. Actualiza el local storage.
  useEffect(() => {
    localStorage.setItem('idUsuario', idUsuario);
    localStorage.setItem('tipoUsuario', tipoUsuario);
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [idUsuario, tipoUsuario, isLoggedIn]);

  //Esta funcion se llama desde el componente login cuando se hace el submit
  const login = async (dniParam, apellidoParam) => {

    const data = {
      apellido: apellidoParam,
      dni: dniParam
    };

    try {
      const response = await clienteAxios.post('/login', data);
      setIdUsuario(response.data._id);
      setTipoUsuario(response.data.tipoUsuario)
      setIsLoggedIn(true);
      setSocioNoExiste(""); // Restablecer el estado de SocioNoExiste
    } catch (error) {
      setSocioNoExiste(error.response.data.msg); //El socio no existe
    }
  }

  const logout = () => {
    setIsLoggedIn(false);
    setIdUsuario('');
    setTipoUsuario("");
  };

  //Si el useState isLoggedIn esta en true, navega
  useEffect(() => {
    if (isLoggedIn) {
      if (tipoUsuario === 'admin') {
        navigate('/admin');
      } else if (tipoUsuario === 'superadmin') {
        navigate('/superadmin');
      } else if (tipoUsuario === 'socio') {
        navigate(`/perfil/${idUsuario}`);
      }
    }
  }, [isLoggedIn, tipoUsuario]);

  return (
    <AuthContext.Provider
      value={{
        idUsuario,
        isLoggedIn,
        tipoUsuario,
        login,
        logout,
        SocioNoExiste,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export {
  AuthProvider,
};

export default AuthContext;