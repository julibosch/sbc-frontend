import { Outlet, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const SuperAdminsLayout = () => {
  const { auth, cargando } = useAuth();

  return (
    <>
      <main className='w-full mx-auto h-screen'>
        {auth.tipoUsuario === "superadmin" ? <Outlet /> : <Navigate to="/" />}
      </main>
      <Footer />
    </>
  )
}

export default SuperAdminsLayout;