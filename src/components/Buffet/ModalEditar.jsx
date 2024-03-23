import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useProductos } from "../../context/ProductosProvider";

const ModalEditar = ({productoEditar, setModalEditar, modalEditar}) => {
  const [nuevoProducto, setNuevoProducto] = useState({
    _id: '',
    descripcion: '',
    categoria: '',
    precio:'',
  });
  const { editarProducto } = useProductos();

useEffect(() => {
  setNuevoProducto({
    _id: productoEditar?._id ? productoEditar._id : '',
    descripcion: productoEditar?.descripcion ? productoEditar.descripcion : '',
    categoria: productoEditar?.categoria ? productoEditar.categoria : '',
    precio: productoEditar?.precio ? productoEditar.precio : '',
  })
}, [productoEditar])
  
const notifySuccess = (descripcion) =>
toast.success(
  <span>
    El producto se edito exitosamente a <span className="underline font-bold">{descripcion}</span>!
  </span>
);
const notifyError = (mensaje) => toast.error(mensaje);

  const handleSubmit = async () => {
    if (nuevoProducto.descripcion === "" || nuevoProducto.categoria === "" || nuevoProducto.precio === "") {
      return notifyError('Rellene todos los campos.');
    }
    if ( nuevoProducto.precio <= 0) {
      return notifyError('Precio debe ser mayor a cero');
    }
    
    try {
      const respuesta = await editarProducto(nuevoProducto);
      notifySuccess(respuesta.productoEditado.descripcion);
      closeDrawer();
    } catch (error) {
      console.log(error)
      notifyError(error.message);
    }
  };
  
  const handleDescripcionChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      descripcion: e.target.value,
    });
  };
  
  const handleCategoriaChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      categoria: e,
    });
  };
  
  const handlePrecioChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      precio: Number(e.target.value),
    });
  };
  
  const closeDrawer = () => setModalEditar(false);

  return (
    <Drawer open={modalEditar} onClose={closeDrawer} >
        <div className="flex items-center justify-between mt-4 px-4 pb-2">
          <Typography
            className="font-bold underline"
            variant="h5"
            color="blue-gray"
          >
            Editar Producto
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="mb-5 px-4">
          <Typography variant="small" color="gray" className="font-normal ">
            Edite los campos del producto y luego presione en CONFIRMAR
          </Typography>
        </div>
        <form className="flex flex-col gap-6 p-4">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Datos del Producto
          </Typography>
          <Input
            type="text"
            label="Descripcion"
            onChange={handleDescripcionChange}
            value={nuevoProducto.descripcion}
          />
          <Select
            label="Seleccione una Categoria"
            onChange={handleCategoriaChange}
            value={nuevoProducto.categoria}
          >
            <Option value="Alimentos">Alimentos</Option>
            <Option value="Bebidas">Bebidas</Option>
            <Option value="Otros">Otros</Option>
          </Select>
          <Input
            label="Precio"
            inputMode="numeric"
            type="number"
            onChange={handlePrecioChange}
            value={nuevoProducto.precio}
          />
          <Button
            className="bg-blue-800 uppercase font-bold text-sm"
            onClick={handleSubmit}
          >
            Confirmar
          </Button>
        </form>
      {/* <ToastContainer
        position="bottom-center"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        pauseOnHover
      /> */}
      </Drawer>
  )
}

export default ModalEditar