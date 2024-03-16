import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import VentasBarChart from "./VentasBarChart";
import VentasPieChart from "./VentasPieChart";
 
export function VentasTabsContainer() {
  const data = [
    {
      label: "Barras",
      value: "barras",
    },
    {
      label: "Pie",
      value: "pie",
    },
  ];
 
  return (
    <Tabs value="html">
      <TabsHeader className="bg-blue-gray-100">
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody
      animate={{
        initial: { y: 250 },
        mount: { y: 0 },
        unmount: { y: 250 },
      }}>
        {data.map(({ value }) => (
          <TabPanel key={value} value={value}>
            { value == "barras" && <VentasBarChart />}
            { value == "pie" && <VentasPieChart />}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}