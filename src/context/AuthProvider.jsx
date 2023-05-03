import { useState, useEffect, createContext } from 'react';
import clienteAxios from "../config/axios";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [dni, setDni] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  console.log(tipoUsuario)

  const login = async (dniParam,apellidoParam) => {

    const data = {
        apellido: apellidoParam,
        dni: dniParam
      };

      try {

        const response = await clienteAxios.post('/login', data);
        setDni(response.data.dni);
        setIdUsuario(response.data._id);
        setTipoUsuario(response.data.tipoUsuario)
        setIsLoggedIn(true);

        

      } catch (error) {
        console.log(error)
      }
  }

  const logout = () => {
    setIsLoggedIn(false);
    setIdUsuario('');
    setTipoUsuario("");
    setDni('');
  };
  

  useEffect(() => {
    if(tipoUsuario === 'admin') {
      return navigate('/admin')
    } 

    if(tipoUsuario === "superadmin"){
      return navigate('/superadmin')
    }

    if(tipoUsuario === "socio"){
      return navigate(`/perfil/${id}`)
    };
    
  }, [tipoUsuario])

  return (
    <AuthContext.Provider
      value={{
        dni,
        idUsuario,
        isLoggedIn,
        tipoUsuario,
        login,
        logout 
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