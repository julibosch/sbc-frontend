import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Select,
  Option
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BuffetAltaProducto = () => {
  const [open, setOpen] = React.useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    descripcion: "",
    categoria: "",
    precio: ""
  })

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => {
    setNuevoProducto({
      descripcion: "",
      categoria: "",
      precio: ""
    })
    setOpen(false)
  };
  const notifySuccess = (descripcion) => toast.success(<span>El producto <span className="underline font-bold">{descripcion}</span> se agregó exitosamente!</span>);
  const notifyError = () => toast.error("Rellene todos los campos.");

  const handleSubmit = () => {
    if (
      nuevoProducto.descripcion === "" ||
      nuevoProducto.categoria === "" ||
      nuevoProducto.precio === 0 ||
      nuevoProducto.precio === ""
    ) {
      notifyError()
    } else {
      try {
        const response = 0
        notifySuccess(nuevoProducto.descripcion)
        closeDrawer()
      } catch (error) {

        notifyError()
      }
    }
  };

  const handleDescripcionChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      descripcion: e.target.value
    });
  };

  const handleCategoriaChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      categoria: e
    });
  };

  const handlePrecioChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      precio: parseFloat(e.target.value)
    });
  };

  return (
    <React.Fragment>
      <Button
        className="bg-sbc-blue w-[15%] flex justify-center items-center py-2 px-2"
        onClick={openDrawer}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
        >
          <path d="M12 5l0 14"></path>
          <path d="M5 12l14 0"></path>
        </svg>
      </Button>
      <Drawer open={open} onClose={closeDrawer}>
        <div className="flex items-center justify-between mt-4 px-4 pb-2">
          <Typography className="font-bold underline" variant="h5" color="blue-gray">
            Alta de un Producto
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
            Agregue los campos del producto y luego presione en CONFIRMAR
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
      </Drawer>
      <ToastContainer
        position="bottom-center"
        autoClose={1500}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        transition:Bounce
      />
    </React.Fragment>
  );
};

export default BuffetAltaProducto