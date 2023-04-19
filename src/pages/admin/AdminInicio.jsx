import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AdminInicio = () => {

  const navigate = useNavigate();

  const { cerrarSesion } = useAuth();

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
      <div className="text-center flex flex-col justify-between h-5/6">
        <div className="py-8 bg-login-form shadow-md w-full">
          <button
            className="absolute right-4 top-4 shadow-md rounded-full bg-yellow-500"
            onClick={cerrarSesion}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-x" width="55" height="55" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="12" cy="12" r="9" />
              <path d="M10 10l4 4m0 -4l-4 4" />
            </svg>
          </button>
          <p className="text-4xl text-slate-200 carter px-6 mt-5">Panel de Administrador</p>
        </div>


        <button
          className="rounded-full p-6 bg-sbc-yellow text-cta-azul sans-pro text-2xl font-bold shadow-md uppercase w-3/4 mx-auto"
          onClick={handleClick}
        >Consultar Socios</button>

        <button
          className="rounded-full p-6 bg-sbc-yellow text-cta-azul sans-pro text-2xl font-bold shadow-md uppercase w-3/4 mx-auto"
          onClick={handleClick}
        >Scanner QR</button>

        <div className="flex flex-row justify-center items-center">
          <img className="w-24" src="../../escudo-sbc.png" alt="Escudo SBC"/>
          <p className="text-4xl pacifico text-slate-200 mb-4 -ml-3">#SoyCanario</p>
        </div>
      </div>
    </>
  )
}

export default AdminInicio;