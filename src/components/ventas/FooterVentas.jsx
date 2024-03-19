import { Button } from "@material-tailwind/react";

const FooterVentas = ({ mostrarDiv, setMostrarDiv }) => {

  const handleRegresar = () => {
    setMostrarDiv(false);
  }

  return (
    <footer className="flex w-4/5 justify-center gap-2">
      {mostrarDiv && (
        <Button
         color="red" 
         className="w-full text-base uppercase"
         onClick={handleRegresar}
         >
          Regresar
        </Button>
      )}
      <Button
        loading={false}
        color="blue"
        className="w-full text-base uppercase"
      >
        Confirmar Venta
      </Button>
    </footer>
  );
};

export default FooterVentas;
