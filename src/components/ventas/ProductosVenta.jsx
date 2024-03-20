import { Link } from "react-router-dom";
import { iconoRestar, iconoSumar } from "../../libs/Icons";
import { useState } from "react";

const ProductosVenta = ({ productosPorCategoria }) => {
  const [productosVenta, setProductosVenta] = useState([]);

  const handleAgregarProducto = (producto) => {
    // Verificar si el producto ya está en la lista de productos seleccionados
    const index = productosVenta.findIndex((item) => item._id === producto._id);

    if (index !== -1) {
      // Si el producto ya existe, incrementar la cantidad y el precio total
      const newProductosSeleccionados = [...productosVenta];
      newProductosSeleccionados[index].cantidad += 1;
      newProductosSeleccionados[index].precioTotal += producto.precio;
      setProductosVenta(newProductosSeleccionados);
    } else {
      // Si el producto no existe, agregarlo a la lista de productos seleccionados
      setProductosVenta([
        ...productosVenta,
        {
          _id: producto._id,
          descripcion: producto.descripcion,
          cantidad: 1,
          precioTotal: producto.precio
        }
      ]);
    }
  };
  console.log(productosVenta)

  const handleRestarProducto = (producto) => {
    console.log(producto)
  }

  return (
    <article className="h-full flex flex-col justify-center min-h-[30vh]">
      <div className="flex flex-col justify-center items-center gap-4 my-4 ">
        {productosPorCategoria.length > 0 ? (
          productosPorCategoria.map((producto) => (
            <p
              key={producto._id}
              className="flex justify-between items-center rounded-lg py-2 bg-white text-cta-azul sans-pro text-2xl font-bold shadow-md uppercase w-3/4 mx-auto"
            >
              <button 
                className="p-0 ml-1 rounded-lg bg-red-500"
                onClick={() => handleRestarProducto(producto)}
                >
                {iconoRestar}
              </button>
              <span className="">{producto.descripcion}</span>
              <button
                className="p-0 mr-1 rounded-lg bg-green-500"
                onClick={() => handleAgregarProducto(producto)}
              >
                {iconoSumar}
              </button>
            </p>
          ))
        ) : (
          <p className="text-white">
            No hay productos que pertenecen a esta categoría,{" "}
            <Link to="/admin/buffet" className="underline font-bold">
              Cargue uno en Buffet
            </Link>
            .
          </p>
        )}
      </div>
    </article>
  );
};

export default ProductosVenta;
