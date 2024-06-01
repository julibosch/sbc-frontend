import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { SidebarWithBurgerMenu } from '../components/Sidebar';

const AdminsLayout = () => {
  const { tipoUsuario } = useAuth();

  return (
    <section className='min-h-screen bg-sbc-login'>
      <main className='min-h-full'>
        {/* <SidebarWithBurgerMenu/> */}
        {tipoUsuario === "admin" ? <Outlet /> : <Navigate to="/" />}
      </main>
    </section>
  )
}

export default AdminsLayout