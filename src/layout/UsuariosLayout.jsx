import { Outlet, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const UsuariosLayout = () => {
  const { auth, cargando } = useAuth();

  return (
    <>
      <main className='container mx-auto '>
        {/* SI EN EL OBJETO AUTH HAY UNA PROPIEDAD LLAMADA codigoSocio */}
        {auth.tipoUsuario === "socio" ? <Outlet /> : <Navigate to="/" />}
      </main>
      <Footer />
    </>
  )
}

export default UsuariosLayout;