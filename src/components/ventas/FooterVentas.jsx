import { Button } from "@material-tailwind/react";
import socioAxios from "../../config/axios";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const FooterVentas = ({
  mostrarDiv,
  setMostrarDiv,
  setProductosVenta,
  productosVenta,
  precioTotal,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const notifySuccess = (mensaje) => toast.success(mensaje);
  const notifyError = (mensaje) => toast.error(mensaje);

  const handleRegresar = () => {
    setMostrarDiv(false);
  };

  const handleConfirmarVenta = async () => {
    setIsLoading(true);
    try {
      const imprimirTicket = productosVenta.some(
        (producto) =>
          producto.categoria == "Bebidas" || producto.categoria == "Alimentos"
      );
      const responseVenta = await socioAxios.post("/admin/ventas", {
        productos: productosVenta,
        precioTotal,
      });
      console.log(responseVenta)
      notifySuccess(responseVenta.data.message);
      //Si se registro la venta en mongo y no hay categoria(otros) solamente en la venta, imprime el ticket
      if (responseVenta && imprimirTicket) {
        const url = import.meta.env.VITE_BACKEND_PHP;
        const respuestaTicket = await axios.post(url, {
          productos: productosVenta,
          precioTotal,
        });

        if (respuestaTicket.data.includes("Fatal error</b>:  Uncaught Error: Class &quot;IntlBreakIterator&quot")) {
          notifyError("Hubo un error, revise la conexion con la ticketera.");
        }
      }

      setProductosVenta([]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      notifyError("Hubo un error, revise el WiFi o el servidor XAMPP.");
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
