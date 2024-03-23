import React, { useState } from "react";
import { useProductos } from "../../context/ProductosProvider";
import Categorias from "../../components/ventas/Categorias";
import DetalleVenta from "../../components/ventas/DetalleVenta";
import { useNavigate } from "react-router-dom";
import { iconoFlecha } from "../../libs/Icons";
import ProductosVenta from "../../components/ventas/ProductosVenta";

const Ventas = () => {
  const [productosPorCategoria, setProductosPorCategoria] = useState([]); //Contiene los productos al seleccionar una categoria
  const [mostrarDiv, setMostrarDiv] = useState(false); //Div que renderiza los productos al seleccionar una categoria
  const [productosVenta, setProductosVenta] = useState([]);
  const { productos } = useProductos();
  const navigate = useNavigate();

  return (
    <section className="text-center flex flex-col gap-2 h-full">
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
          {`${
            !mostrarDiv
              ? "Categorías"
              : productosPorCategoria.length > 0
              ? productosPorCategoria[0].categoria
              : "No hay productos"
          }`}
        </h1>
      </div>
      {/* Article de Categorias */}
      {!mostrarDiv ? (
        <article className="h-1/2 pb-5 mb-[10%]">
          <Categorias
            setProductosPorCategoria={setProductosPorCategoria}
            productos={productos}
            setMostrarDiv={setMostrarDiv}
          />
        </article>
      ) : (
        <ProductosVenta 
        productosPorCategoria={productosPorCategoria} 
        productosVenta={productosVenta}
        setProductosVenta={setProductosVenta}
        />
      )}
      {/* Article de detalle de productos seleccionado */}
      <DetalleVenta 
      mostrarDiv={mostrarDiv} 
      setMostrarDiv={setMostrarDiv} 
      productosVenta={productosVenta}
      setProductosVenta={setProductosVenta}
      />
    </section>
  );
};

export default Ventas;
