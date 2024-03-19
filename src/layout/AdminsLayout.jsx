import { Outlet, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const AdminsLayout = () => {
  const { tipoUsuario } = useAuth();

  return (
    <section className='h-screen bg-sbc-login'>
      <main className='h-[94%]'>
        {/* SI EN EL OBJETO AUTH HAY UNA PROPIEDAD LLAMADA codigoSocio */}
        {tipoUsuario === "admin" ? <Outlet /> : <Navigate to="/" />}
      </main>
      {/* <Footer /> */}
    </section>
  )
}

export default AdminsLayout