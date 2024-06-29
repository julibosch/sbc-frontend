import React, { useEffect, useState } from "react";
import ProductosVenta from "../ProductosVenta";

const CardCategorias = ({
  categoriaTitle,
  productos,
  productosVenta,
  setProductosVenta,
}) => {
  const [productosPorCat, setProductosPorCat] = useState([]);

  const obtenerProductosCategoria = (categoriaTitle, productos) => {
    const productosFiltrados = [...productos].filter(
      (producto) =>
        producto?.categoria.toLowerCase() == categoriaTitle.toLowerCase()
    );
    setProductosPorCat(productosFiltrados);
  };

  useEffect(() => {
    obtenerProductosCategoria(categoriaTitle, productos);
  }, [categoriaTitle]);

  return (
    <div className="grow bg-yellow-200/80 rounded-md overflow-hidden">
      <h2 className="bg-yellow-700 text-lg uppercase font-bold py-2">
        {categoriaTitle}
      </h2>
      <div>
        <ProductosVenta
          productosPorCategoria={productosPorCat}
          productosVenta={productosVenta}
          setProductosVenta={setProductosVenta}
        />
      </div>
    </div>
  );
};

export default CardCategorias;
