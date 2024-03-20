import React, { useState } from "react";
import { useProductos } from "../../context/ProductosProvider";
import Categorias from "../../components/ventas/Categorias";
import DetalleVenta from "../../components/ventas/DetalleVenta";
import { useNavigate } from "react-router-dom";
import { iconoFlecha } from "../../libs/Icons";

const Ventas = () => {
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const [mostrarDiv, setMostrarDiv] = useState(false);
  const { productos } = useProductos();
  const navigate = useNavigate();

  return (
    <section className="text-center flex flex-col gap-5 h-full">
      <div className="py-4 bg-login-form shadow-md w-full relative">
        {!mostrarDiv && (
          <button
            className="w-14 h-14 left-3 top-1 absolute bg-sbc-yellow flex justify-center items-center rounded-full shadow-md"
            onClick={() => navigate("/admin")}
          >
            {iconoFlecha}
          </button>
        )}
        <h1 className="text-center text-2xl text-blue-gray-50 carter">
          {`${!mostrarDiv ? "Categorías" : productosPorCategoria[0].categoria}`}
        </h1>
      </div>
      {/* Article de Categorias */}
      {!mostrarDiv ? (
        <article className="h-1/2">
          <Categorias
            setProductosPorCategoria={setProductosPorCategoria}
            productos={productos}
            setMostrarDiv={setMostrarDiv}
          />
        </article>
      ) : (
        <article className="h-full flex flex-col justify-center min-h-[50vh]">
        <div className="flex flex-col justify-center items-center gap-2 my-4 ">
          {productosPorCategoria.map((producto) => (
            <p
              key={producto._id}
              onClick={() => handleAgregarProducto(producto)}
              className="rounded-full py-2 bg-white text-cta-azul sans-pro text-2xl font-bold shadow-md uppercase w-3/4 mx-auto"
            >
              {producto.descripcion}
            </p>
          ))}
        </div>
        </article>
      )}
      {/* Article de detalle de productos seleccionado */}
      <DetalleVenta mostrarDiv={mostrarDiv} setMostrarDiv={setMostrarDiv} />
    </section>
  );
};

export default Ventas;
