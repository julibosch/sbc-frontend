import React from 'react';
import {useNavigate} from 'react-router-dom';

const ListaSocios = () => {

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/admin')
  };

  return (
    <div className="h-20 bg-indigo-900 shadow-lg items-center flex flex-row">
      <button
        className='w-16 h-16 left-2 absolute bg-indigo-700 flex justify-center items-center rounded-full shadow-md'
        onClick={handleNavigation}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffbf00" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="5" y1="12" x2="11" y2="18" />
          <line x1="5" y1="12" x2="11" y2="6" />
        </svg>
      </button>
      <div className='w-full flex justify-center items-center'>
        <p className="text-3xl font-bold text-yellow-400 ">Lista de Socios</p>
      </div>
    </div>
  )
}

export default ListaSocios;