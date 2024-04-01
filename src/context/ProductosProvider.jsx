import React, { createContext, useContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const ProductosContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
      throw new Error("useProductos debe estar dentro del proveedor ProductsContext");
  }
  return context;
};

const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const listadoProductos = async () => {
    try {
      const responseAxios = await clienteAxios.get("/admin/productos");
      setProductos(responseAxios.data);
      return;
    } catch (error) {
      return error;
    }
  }
  useEffect(() => {
    listadoProductos();
  }, [])

  useEffect(() => {
    setProductosFiltrados(productos);
  }, [productos])

  const crearProducto = async (producto) => {
    try {
      const responseAxios = await clienteAxios.post('/admin/productos', producto);
      const { productoCreado, message } = responseAxios.data;
      setProductos(prevProducto => [...prevProducto, productoCreado]);
      return { productoCreado, message };
    } catch (error) {
      return error;
    }
  }
  
  //!Fijarse como llega el parametro aca.
  const editarProducto = async (producto) => {
    console.log(producto)
    try {
      const responseAxios = await clienteAxios.put(`/admin/productos/${producto._id}`, producto);
      const { productoEditado, message } = responseAxios.data;
      const productosEditados = productos.map( producto => producto._id == productoEditado._id ? productoEditado : producto);
      setProductos(productosEditados);
      return { productoEditado, message };
    } catch (error) {
      return error;
    }
  }

  const eliminarProducto = async (_id) => {
    try {
      const responseAxios = await clienteAxios.delete(`/admin/productos${_id}`);
      const { message } = responseAxios.data;
      const productosEliminado = productos.filter( producto => producto._id != _id );
      setProductos(productosEliminado);
      return { message };
    } catch (error) {
      return error;
    }
  }

  return (
    <ProductosContext.Provider value={{listadoProductos, crearProducto, editarProducto, eliminarProducto, productosFiltrados, setProductosFiltrados, productos, setProductos}}>
      {children}
    </ProductosContext.Provider>
  )
}

export default ProductosProvider;