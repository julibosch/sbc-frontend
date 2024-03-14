import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import socioAxios from "../../config/axios";

const AdminInicio = () => {
  const [socios, setSocios] = useState([]); //Arreglo original de socios
  const [sociosFiltrados, setSociosFiltrados] = useState([]); //Arreglo secundario, para no modificar el original

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleClick = (e) => {
    const target = e.target.textContent;

    if (target === 'Consultar Socios') {
      navigate('/admin/socios')
    } else if (target === 'Scanner QR') {
      navigate('/admin/scanner-qr')
    } else if (target === "Buffet") {
      navigate('/admin/buffet')
    }
  }

  useEffect(() => {
    const obtenerSocios = async () => {
      try {
        const response = await socioAxios.get("/admin/socios");
        setSocios(response.data);
        setSociosFiltrados(response.data);
      } catch (error) {
        console.log(error);
        // setAlerta({ msg: "Fallo en la conexión, intentalo nuevamente", error: true });
      }
    };
    obtenerSocios();
  }, [])

  return (
    <div className="text-center flex flex-col justify-between h-full">
      <div className="py-6 bg-login-form shadow-md w-full">
        <button
          className="h-14 w-14 absolute right-3 top-3 shadow-md rounded-full bg-yellow-500"
          onClick={logout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-x" width="55" height="55" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="10" />
            <path d="M10 10l4 4m0 -4l-4 4" />
          </svg>
        </button>
        <p className="text-4xl text-blue-gray-100 carter px-6">Panel de Administrador</p>
      </div>

      <div className="flex flex-col gap-6">
        <button
          className="rounded-full py-4 bg-sbc-yellow text-cta-azul sans-pro text-2xl font-bold shadow-md uppercase w-3/4 mx-auto"
          onClick={handleClick}
        >
          Consultar Socios
        </button>

        <button
          className="rounded-full py-4 bg-sbc-yellow text-cta-azul sans-pro text-2xl font-bold shadow-md uppercase w-3/4 mx-auto"
          onClick={handleClick}
        >
          Scanner QR
        </button>

        <button
          className="rounded-full py-4 bg-sbc-yellow text-cta-azul sans-pro text-2xl font-bold shadow-md uppercase w-3/4 mx-auto"
          onClick={handleClick}
        >
          Buffet
        </button>
      </div>

      <div className="flex flex-row justify-center items-center">
        <img className="w-24" src="../../escudo-sbc.png" alt="Escudo SBC" />
        <p className="text-4xl pacifico text-blue-gray-50 mb-4 -ml-3">#SoyCanario</p>
      </div>
    </div>
  )
}

export default AdminInicio;