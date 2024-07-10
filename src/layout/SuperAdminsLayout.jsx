import { Outlet, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const SuperAdminsLayout = () => {
  const { tipoUsuario } = useAuth();

  return (
    <>
      <main className='w-full mx-auto h-screen'>
        {tipoUsuario === "superadmin" ? <Outlet /> : <Navigate to="/" />}
      </main>
      <Footer />
    </>
  )
}

export default SuperAdminsLayout;