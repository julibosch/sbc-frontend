import { Link } from "react-router-dom";
import { iconoRestar, iconoSumar } from "../../libs/Icons";

const ProductosVenta = ({
  productosPorCategoria,
  productosVenta,
  setProductosVenta,
}) => {
  const handleAgregarProducto = (producto) => {
    // Verificar si el producto ya está en la lista de productos seleccionados
    const index = productosVenta.findIndex((item) => item._id === producto._id);

    if (index !== -1) {
      // Si el producto ya existe, incrementar la cantidad y el precio total
      const newProductosSeleccionados = [...productosVenta];
      newProductosSeleccionados[index].cantidad += 1;
      setProductosVenta(newProductosSeleccionados);
    } else {
      // Si el producto no existe, agregarlo a la lista de productos seleccionados
      setProductosVenta([
        ...productosVenta,
        {
          _id: producto._id,
          descripcion: producto.descripcion,
          cantidad: 1,
          precioUnitario: producto.precio,
          categoria: producto.categoria
        },
      ]);
    }
  };

  const handleRestarProducto = (producto) => {
    // Verificar si el producto ya está en la lista de productos seleccionados
    const index = productosVenta.findIndex((item) => item._id === producto._id);

    if (index !== -1) {
      // Si el producto existe y la cantidad es mayor que 1, restar la cantidad
      if (productosVenta[index].cantidad > 1) {
        const newProductosSeleccionados = [...productosVenta];
        newProductosSeleccionados[index].cantidad -= 1;
        setProductosVenta(newProductosSeleccionados);
      } else {
        // Si la cantidad es 1, eliminar el producto de la lista de productos seleccionados
        const newProductosSeleccionados = [...productosVenta];
        newProductosSeleccionados.splice(index, 1);
        setProductosVenta(newProductosSeleccionados);
      }
    }
  };

  return (
    <article className="h-full flex flex-col justify-center min-h-[30vh]">
      <div className="flex flex-col justify-center items-center gap-4 my-4 ">
        {productosPorCategoria.length > 0 ? (
          productosPorCategoria.map((producto) => (
            <p
              key={producto._id}
              className="flex md:text-lg text-2xl justify-between items-center rounded-lg py-1 bg-white text-cta-azul sans-pro font-bold shadow-md uppercase w-3/4 mx-auto"
            >
              <button
                className="p-0 ml-1 rounded-lg bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform active:scale-110"
                onClick={() => handleRestarProducto(producto)}
              >
                {iconoRestar}
              </button>
              <span className="">{producto.descripcion}</span>
              <button
                className="p-0 mr-1 rounded-lg bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transform active:scale-110"
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
          </p>
        )}
      </div>
    </article>
  );
};

export default ProductosVenta;
