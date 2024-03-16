import {
  Card,
  CardBody,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
 
const chartConfig = {
  type: "pie",
  width: 320,
  height: 320,
  series: [{desc: "choripan", cant: 44}],
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "Anashe",
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
    legend: {
      show: false,
    },
  },
};
 
export default function VentasPieChart() {
  return (
    <Card className="bg-transparent">
      <CardBody className="mt-4 p-0 grid place-items-center px-2">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}