import { Outlet, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const UsuariosLayout = () => {
  const { tipoUsuario } = useAuth();

  return (
    <>
      <main className='h-screen bg-gradient-to-t from-sbc-yellow to-sbc-blue to-80%'>
        {/* SI EN EL OBJETO AUTH HAY UNA PROPIEDAD LLAMADA codigoSocio */}
        {tipoUsuario === "socio" ? <Outlet /> : <Navigate to="/" />}
      </main>
      <Footer />
    </>
  )
}

export default UsuariosLayout;