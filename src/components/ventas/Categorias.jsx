import { iconoAlimento } from "../../libs/Icons.jsx";

const categorias = ["alimentos", "bebidas", "otros"];

const Categorias = ({ setProductosPorCategoria, productos, setMostrarDiv }) => {
  const handleCategoria = (categoria) => {
    const productosFiltrados = [...productos].filter(
      (producto) => producto?.categoria.toLowerCase() == categoria.toLowerCase()
    );
    setProductosPorCategoria(productosFiltrados);
    setMostrarDiv(true);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-6">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          onClick={() => handleCategoria(categoria)}
          className="rounded-full py-2 bg-sbc-yellow text-cta-azul sans-pro text-2xl font-bold shadow-md uppercase w-3/4 mx-auto flex justify-center items-center gap-2"
        >
            {categoria === "alimentos" && iconoAlimento}
            {categoria === "bebidas" && iconoAlimento}
            {categoria === "otros" && iconoAlimento}
          {categoria}
        </button>
      ))}
    </div>
  );
};

export default Categorias;
