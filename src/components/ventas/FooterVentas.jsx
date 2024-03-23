import { Button } from "@material-tailwind/react";
import socioAxios from "../../config/axios";
import { useState } from "react";

const FooterVentas = ({
  mostrarDiv,
  setMostrarDiv,
  setProductosVenta,
  productosVenta,
  precioTotal,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegresar = () => {
    setMostrarDiv(false);
  };

  const handleConfirmarVenta = async () => {
    setIsLoading(true);
    try {
      const responseVenta = await socioAxios.post("/admin/ventas", {
        productos: productosVenta,
        precioTotal,
      });
      console.log(responseVenta);

      setProductosVenta([]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <footer className="flex w-4/5 justify-center gap-2 mb-3">
      {mostrarDiv && (
        <Button
          color="red"
          className="w-full text-sm uppercase"
          onClick={handleRegresar}
        >
          Regresar
        </Button>
      )}
      <Button
        loading={isLoading}
        disabled={productosVenta.length <= 0}
        color="blue"
        className="w-full text-sm uppercase"
        onClick={handleConfirmarVenta}
      >
        Confirmar Venta
      </Button>
    </footer>
  );
};

export default FooterVentas;
