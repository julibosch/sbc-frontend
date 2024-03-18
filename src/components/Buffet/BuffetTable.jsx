import React, { useState } from 'react'
import { FixedSizeList } from "react-window";
import BuffetAltaProducto from './BuffetAltaProducto.jsx';
import { useProductos } from '../../context/ProductosProvider.jsx';
import ModalEditar from './ModalEditar.jsx';
import { Tooltip } from "@material-tailwind/react";

const BuffetTable = () => {
  const {productosFiltrados, setProductosFiltrados, productos} = useProductos();
  const [ productoEditar, setProductoEditar ] = useState(); //Guarda el producto a editar y lo pasa por props al modal
  const [ modalEditar, setModalEditar ] = useState(false); //Activa el modal para editar un producto

  const handleChange = (e) => {
    const inputValue = e.target.value;

    const productosFiltradosArr = [...productos].filter(producto =>
      producto.descripcion.toLowerCase().includes(inputValue.toLowerCase()) || producto.categoria.toLowerCase().includes(inputValue.toLowerCase())
    );

    setProductosFiltrados(productosFiltradosArr);
  }

  const Producto = ({ index, style }) => {

    const handleEditar = (producto) => {
      setProductoEditar(producto);
      setModalEditar(true);
    };

    return (
      <Tooltip content={`Click para editar ${productosFiltrados[index].descripcion}`} animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}>
        <li
          className="border-y border-blue-gray-800 text-sm flex items-center font-semibold hover:bg-blue-gray-300 transition-all cursor-pointer"
          key={productosFiltrados[index]._id}
          style={style}
          onClick={() => handleEditar(productosFiltrados[index])}
        >
          <p className="w-[35%] text-left pl-2">{productosFiltrados[index].descripcion}</p>
          <p className="w-[40%] text-left pl-2">{productosFiltrados[index].categoria}</p>
          <p className="w-[15%] text-left pl-2">{productosFiltrados[index].precio}</p>
        </li>
      </Tooltip>
    );
  };

  return (
    <div className='bg-gray-300 h-4/5 rounded-md'>
      <div className="flex flex-col">
        <div className="flex px-2 py-2 rounded-t-md bg-blue-gray-400">
          <input
            className="text-base mr-2 px-2 grow rounded focus:outline-light-blue-500 sans-pro"
            type="search"
            placeholder="Descripcion o Categoria"
            onChange={handleChange}
          />

          <BuffetAltaProducto />
        </div>

        <ul className="flex flex-col">
          <li className="flex carter bg-yellow-400 text-cta-azul items-center py-3 border-b">
            <p className="w-[35%] pl-2">Descripcion</p>
            <p className="w-[40%]">Categoria</p>
            <p className="w-[10%]">Precio</p>
          </li>

          {productosFiltrados.length > 0 ? (
            <FixedSizeList
              className="mx-auto overflow-x-scroll rounded-lg"
              width={"100%"}
              height={320}
              itemCount={productosFiltrados.length}
              itemSize={45}
            >
              {Producto}
            </FixedSizeList>
          ) : productosFiltrados.length > 0 ? (
            <li className="bg-red-200">
              <p className="px-6 py-4 text font-semibold text-gray-900 whitespace-nowrap">
                No existe el socio con la búsqueda utilizada
              </p>
            </li>
          ) : (
            <li className="bg-red-200">
              <p className="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                No hay ningún socio, cargue uno
              </p>
            </li>
          )}
        </ul>
      {
        <ModalEditar productoEditar={productoEditar} setModalEditar={setModalEditar} modalEditar={modalEditar}/>
      }
      </div>
    </div>
  )
}

export default BuffetTable