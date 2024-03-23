import { Outlet, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const AdminsLayout = () => {
  const { tipoUsuario } = useAuth();

  return (
    <section className='min-h-screen bg-sbc-login'>
      <main className='min-h-full'>
        {/* SI EN EL OBJETO AUTH HAY UNA PROPIEDAD LLAMADA codigoSocio */}
        {tipoUsuario === "admin" ? <Outlet /> : <Navigate to="/" />}
      </main>
    </section>
  )
}

export default AdminsLayout