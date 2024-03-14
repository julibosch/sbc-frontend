import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
  Select,
  Option
} from "@material-tailwind/react";

const BuffetAltaProducto = () => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      <Button
        className="bg-sbc-blue w-[15%] flex items-center py-2 px-3"
        onClick={openDrawer}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
      </Button>
      <Drawer
        open={open}
        onClose={closeDrawer}
      >
        <div className="flex items-center justify-between px-4 pb-2">
          <Typography className="font-bold" variant="h5" color="blue-gray">
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
          <Input type="text" label="Descripcion" />
          <Select label="Seleccione una Categoria">
            <Option>Alimentos</Option>
            <Option>Bebidas</Option>
            <Option>Otros</Option>
          </Select>
          <Input label="Precio" inputMode="numeric" type="number"/>
          <Button className="bg-blue-800 uppercase font-bold text-sm">Confirmar</Button>
        </form>
      </Drawer>
    </React.Fragment>
  );
}

export default BuffetAltaProducto