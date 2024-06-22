import React, { useState } from "react";
import {
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";

export function SelectorGrafico({ setGraficoVisible }) {
  const [tipoGrafico, setTipoGrafico] = useState("barras"); // Estado para el tipo de gráfico seleccionado

  const handleChangeTipoGrafico = (tipo) => {
    setTipoGrafico(tipo);
    setGraficoVisible(tipo)
  };

  return (
    <Card>
      <List>
        <ListItem className="p-0">
          <label
            htmlFor="vertical-list-barras"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name="vertical-list"
                id="vertical-list-barras"
                ripple={false}
                checked={tipoGrafico === "barras"}
                onChange={() => handleChangeTipoGrafico("barras")}
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="font-medium text-blue-gray-400"
            >
              Barras
            </Typography>
          </label>
        </ListItem>
        <ListItem className="p-0">
          <label
            htmlFor="vertical-list-torta"
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name="vertical-list"
                id="vertical-list-torta"
                ripple={false}
                checked={tipoGrafico === "torta"}
                onChange={() => handleChangeTipoGrafico("torta")}
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
            <Typography
              color="blue-gray"
              className="font-medium text-blue-gray-400"
            >
              Torta
            </Typography>
          </label>
        </ListItem>
      </List>
    </Card>
  );
}
