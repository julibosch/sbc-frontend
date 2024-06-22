import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

export default function GraficoTorta({
  fechaDesde,
  fechaHasta,
  fechasGrafico,
}) {
  const nombreProductos = fechasGrafico.map((producto) => producto.descripcion);
  const precioProductos = fechasGrafico.map((producto) => producto.totalVentas);

  const chartConfig = {
    type: "pie",
    width: 800,
    height: 400,
    series: precioProductos.length > 0 ? precioProductos : [0],
    options: {
      chart: {
        toolbar: {
          show: true,
        },
      },
      title: {
        text: "VENTAS POR PRODUCTO",
        align: "center",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60", "#F90505", "#F99505", "#1FF905", "#050CF9", "#FFFFFF"],
      legend: {
        show: true,
        position: "bottom",
        labels: {
          colors: "#616161",
          useSeriesColors: false,
        },
        markers: {
          fillColors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60", "#F90505", "#F99505", "#1FF905", "#050CF9", "#FFFFFF"],
        },
      },
      labels: nombreProductos.length > 0 ? nombreProductos : ["No hay datos"] ,
    },
  };

  return (
    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div>
          <Typography variant="h6" color="blue-gray">
            Período de {fechaDesde} - {fechaHasta}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
