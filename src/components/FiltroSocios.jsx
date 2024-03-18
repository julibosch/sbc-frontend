import React from "react";

const FiltroSocios = ({setSociosFiltrados, socios}) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;

    const sociosFiltrados = [...socios].filter(
      (socio) =>
        socio.nombreCompleto.toLowerCase().includes(inputValue.toLowerCase()) ||
        socio.dni.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSociosFiltrados(sociosFiltrados);
  };

  return (
    <div className="bg-blue-gray-200 rounded-t-lg">
      <div className="flex flex-row p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-search"
          width="35"
          height="35"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#000000"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="10" cy="10" r="7" />
          <line x1="21" y1="21" x2="15" y2="15" />
        </svg>
        <input
          className="text-lg px-2 ml-2 w-10/12 my-0.5 rounded focus:outline-yellow-500 sans-pro"
          type="search"
          placeholder="DNI o Nombre del socio"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FiltroSocios;
