import { useState, useEffect, createContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  // usamos el state "cargando" para saber cuando termina de setear "auth" con la data del socio en el try.
  const [cargando, setCargando] = useState(true); 

  useEffect(() => {
    const autenticarUsuario = async () => {
      try {
        const data = await JSON.parse(localStorage.getItem("userData"));
        if (!data) {
          // Si no hay data(nada en localStorage) entonces el cargando se setea a false y se retorna para que el auth quede vacio y en la validacion de las rutas protegidas(UsuariosLayout y AdminLayout) se redireccione al login.
          setCargando(false);
          return;
        };

        // Si hay data(Datos del socio en el localStorage) entonces se setea "auth" con esa data.
        setAuth(data); 
      } catch (error) {
        setAuth({}); // En caso de cualquier error en la consulta, se setea vacio.
      };

      // Camino del try: Luego de que se setee el auth con la data del socio, se setea el cargando en false.
      setCargando(false);
    };

    autenticarUsuario();
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem("socioData");
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando, //Se pasa el cargando, para saber cuando es que se termina de hacer el seteo de los states.
        cerrarSesion
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export {
  AuthProvider
};

export default AuthContext;