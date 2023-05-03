import { Outlet, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const AdminsLayout = () => {
  const { tipoUsuario } = useAuth();


  return (
    <>
      <main className='container mx-auto h-screen bg-sbc-login'>
        {/* SI EN EL OBJETO AUTH HAY UNA PROPIEDAD LLAMADA codigoSocio */}
        {tipoUsuario === "admin" ? <Outlet /> : <Navigate to="/" />}
      </main>
      <Footer />
    </>
  )
}

export default AdminsLayout