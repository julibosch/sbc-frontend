import { Outlet, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const AdminsLayout = () => {
  const { auth, cargando } = useAuth();

  return (
    <>
      <main className='h-screen bg-sbc-login'>
        {auth.tipoUsuario === "admin" ? <Outlet /> : <Navigate to="/" />}
      </main>
      <Footer />
    </>
  )
}

export default AdminsLayout