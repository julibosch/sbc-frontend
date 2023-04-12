import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AdminInicio = () => {

  const navigate = useNavigate();

  const {cerrarSesion} = useAuth();

  const handleClick = (e) => {
    const target = e.target.textContent;

    if (target === 'Consultar Socios') {
      navigate('/admin/socios')
    } else if (target === 'Scanner QR') {
      //Decidir si hacer una vista nueva con el scanner o simplemente que se ejecute un modal con el scanenr
      navigate('/admin/scanner-qr') 
    }
  }

  return (
    <>
      <div className="text-center flex flex-col gap-24">
        <div className="py-8 bg-indigo-900 shadow-lg">
          <p className="text-3xl font-bold text-yellow-400 ">Panel de Administrador</p>
          <button
            className="text-slate-800 font-semibold bg-red-300 py-2 px-5 mt-5 shadow-md"
            onClick={cerrarSesion}
          >Cerrar Sesión</button>
        </div>
        <p className="text-4xl font-bold">#SoyCanario</p>
        
        <button
          className="rounded-2xl p-6 bg-indigo-800 text-2xl font-bold text-yellow-500 shadow-lg uppercase w-3/4 mx-auto"
          onClick={handleClick}
        >Consultar Socios</button>

        <button
          className="rounded-2xl p-6 bg-indigo-800 text-2xl font-bold text-yellow-500 shadow-lg uppercase w-3/4 mx-auto"
          onClick={handleClick}
        >Scanner QR</button>
      </div>
    </>
  )
}

export default AdminInicio;