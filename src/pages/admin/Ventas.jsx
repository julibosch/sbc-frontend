import React, { useState } from "react";
import { useProductos } from "../../context/ProductosProvider";
import Categorias from "../../components/ventas/Categorias";
import FooterVentas from "../../components/ventas/FooterVentas";
import DetalleVenta from "../../components/ventas/DetalleVenta";

const Ventas = () => {
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const [mostrarDiv, setMostrarDiv] = useState(false);
  const { productos } = useProductos();

  return (
    <section className="text-center flex flex-col gap-5 h-full">
      <div className="py-4 bg-login-form shadow-md w-full">
        <h1 className="text-center text-3x text-blue-gray-50 carter">
          {`${!mostrarDiv ? 'Categorias' : productos[0].categoria}`}
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
        <article className="h-1/2 flex flex-col justify-center gap-6">
          {productosPorCategoria.map((producto) => (
            <button
              key={producto._id}
              onClick={() => handleAgregarProducto(producto)}
              className="rounded-full py-2 bg-sbc-yellow text-cta-azul sans-pro text-2xl font-bold shadow-md uppercase w-3/4 mx-auto"
            >
              {producto.descripcion}
            </button>
          ))}
        </article>
      )}
      {/* Article de detalle de productos seleccionado */}
      <DetalleVenta mostrarDiv={mostrarDiv} setMostrarDiv={setMostrarDiv} />
    </section>
  );
};

export default Ventas;
