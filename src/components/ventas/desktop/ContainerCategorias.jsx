import React from "react";
import CardCategorias from "./CardCategorias";

const ContainerCategorias = ({
  productos,
  productosVenta,
  setProductosVenta,
}) => {
  return (
    <div className="w-4/5 mx-auto mt-5 flex gap-10">
      <CardCategorias
        productos={productos}
        key={"alimentos"}
        categoriaTitle={"alimentos"}
        productosVenta={productosVenta}
        setProductosVenta={setProductosVenta}
      />

      <CardCategorias
        productos={productos}
        key={"bebidas"}
        categoriaTitle={"bebidas"}
        productosVenta={productosVenta}
        setProductosVenta={setProductosVenta}
      />

      <CardCategorias
        productos={productos}
        key={"otros"}
        categoriaTitle={"otros"}
        productosVenta={productosVenta}
        setProductosVenta={setProductosVenta}
      />
    </div>
  );
};

export default ContainerCategorias;
