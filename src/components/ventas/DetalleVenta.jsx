import React from "react";
import FooterVentas from "./FooterVentas";

const DetalleVenta = ({ mostrarDiv, setMostrarDiv }) => {
  return (
    <article className="h-full min-h-[50vh] marker:scroll w-full flex flex-col justify-center items-center gap-3">
      <div className="w-4/5 h-4/5 p-2 rounded-lg bg-blue-gray-100">
        <p className="py-2">Detalle</p>
        <hr className="bg-black w-full mb-1" />
        <ul className="flex flex-col">
          <li className="flex flex-row justify-between mx-2">
            <span>x2</span> <p>Choripan</p> <span>$1500</span>
          </li>
          <li className="flex flex-row justify-between mx-2">
            <span>x3</span> <p>Hamburguesa</p> <span>$1500</span>
          </li>
          <li className="flex flex-row justify-between mx-2">
            <span>x1</span> <p>Coca cola grande</p> <span>$1500</span>
          </li>
          <li className="flex flex-row justify-between mx-2">
            <span>x1</span> <p>Coca cola grande</p> <span>$1500</span>
          </li>
          <li className="flex flex-row justify-between mx-2">
            <span>x1</span> <p>Coca cola grande</p> <span>$1500</span>
          </li>
          <li className="flex flex-row justify-between mx-2">
            <span>x1</span> <p>Sandwich de milanesa</p> <span>$1500</span>
          </li>
        </ul>
      </div>
      {/* BOTONES */}
      <FooterVentas mostrarDiv={mostrarDiv} setMostrarDiv={setMostrarDiv} />
    </article>
  );
};

export default DetalleVenta;
