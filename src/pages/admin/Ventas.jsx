import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useProductos } from "../../context/ProductosProvider";

const categorias = ["alimentos", "bebidas", "otros"];

const Ventas = () => {
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const [mostrarDiv, setMostrarDiv] = useState(false);
  const { productos } = useProductos();

  const handleCategoria = (categoria) => {
    const productosFiltrados = [...productos].filter(
      (producto) => producto?.categoria.toLowerCase() == categoria.toLowerCase()
    );
    setProductosPorCategoria(productosFiltrados);
    setMostrarDiv(true);
  };

  return (
    <section className="text-center flex flex-col gap-5 h-full">
      {/* Article de Categorias */}
      {!mostrarDiv ? (
        <article className="h-1/2">
          <div className="py-4 bg-login-form shadow-md w-full">
            <h1 className="text-center text-3x text-blue-gray-50 carter">
              Categorías
            </h1>
          </div>
          <div className="h-3/4 flex flex-col justify-center gap-6">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => handleCategoria(categoria)}
                className="rounded-full py-2 bg-sbc-yellow text-cta-azul sans-pro text-2xl font-bold shadow-md uppercase w-3/4 mx-auto"
              >
                {categoria}
              </button>
            ))}
          </div>
        </article>
      )
      :
      (
        <article className="h-1/2">
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
      <article className="h-1/2 w-full flex flex-col justify-center items-center gap-3 overflow-hidden">
        <div className="w-4/5 h-4/5 rounded-lg bg-blue-gray-100">
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
          </ul>
        </div>
        <Button
          loading={false}
          color="blue"
          className="w-3/4 text-base uppercase"
        >
          Confirmar Venta
        </Button>
      </article>
    </section>
  );
};

export default Ventas;
