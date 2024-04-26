import React, { useState, useEffect } from "react";
import FooterVentas from "./FooterVentas";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const DetalleVenta = ({ mostrarDiv, setMostrarDiv, productosVenta, setProductosVenta }) => {
  const [precioTotal, setPrecioTotal] = useState(0);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    let sumarPrecioTotal = 0;

    if (productosVenta.length > 0) {

      [...productosVenta].forEach(producto => {
        sumarPrecioTotal += producto.cantidad*producto.precioUnitario
      })

      setPrecioTotal(sumarPrecioTotal);
    } else {
      setPrecioTotal(0);
    }
  }, [productosVenta])
  
  return (
    <article className="h-full min-h-[30vh] marker:scroll w-full flex flex-col justify-center items-center gap-3">
      <div className="w-4/5 h-4/5 p-2 rounded-lg bg-blue-gray-100 sans-pro">
        <p className="font-black uppercase text-sm md:text-lg">Detalle</p>
        <hr className="bg-black w-full my-2" />
        <ul ref={parent} className="flex flex-col text-sm md:text-lg">
          {productosVenta.length ? (
            productosVenta.map((producto) => (
              <li key={producto._id} className="mx-2">
                <p className="flex justify-between w-full uppercase">
                  <span>x{producto.cantidad}</span>
                  <span className="px-3 grow text-left">
                    {producto.descripcion}
                  </span>
                  <span>${producto.precioUnitario}</span>
                </p>
              </li>
            ))
          ) : (
            <li>
              <p>Ingrese productos</p>
            </li>
          )}
        </ul>
        <hr className="bg-black w-full my-2" />
        <p className="px-2 font-bold flex justify-between w-full uppercase text-sm md:text-lg">
          <span>Total:</span>
          <span>{precioTotal.toLocaleString("es-AR", {
            style: "currency",
            currency: "ARS",
          })}</span>
        </p>
      </div>
      {/* BOTONES */}
      <FooterVentas 
      mostrarDiv={mostrarDiv} 
      setMostrarDiv={setMostrarDiv} 
      precioTotal={precioTotal}
      setProductosVenta={setProductosVenta}
      productosVenta={productosVenta}
      />
    </article>
  );
};

export default DetalleVenta;
