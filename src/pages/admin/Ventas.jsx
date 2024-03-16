import React from 'react'
import VentasHeader from '../../components/Buffet/Ventas/VentasHeader'
import { Link } from 'react-router-dom'
import VentasBarChart from '../../components/Buffet/Ventas/VentasBarChart'
import { VentasTabsContainer } from '../../components/Buffet/Ventas/VentasTabsContainer'

const Ventas = () => {
  return (
    <div className="text-center flex flex-col gap-5 h-full">
      <VentasHeader />

      <div className="flex flex-col gap-2 px-5 w-full h-full">
        <div className='bg-black/60 transition-all rounded-xl min-h-[68%] overflow-hidden'>
          <VentasTabsContainer />
        </div>

        <div className='flex flex-col h-1/6 justify-evenly gap-2 mt-4'>
          <Link to={'/admin/buffet/ventas'} className="flex items-center justify-center gap-4 text-cta-azul sans-pro shadow-md uppercase w-full font-extrabold text-xl py-2 text-center mx-auto rounded-md bg-sbc-yellow">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-history"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 8l0 4l2 2" /><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" /></svg>
            Historial de ventas
          </Link>

          <Link to={'/admin/buffet/ventas'} className="flex items-center justify-center gap-4 text-cta-azul sans-pro shadow-md uppercase w-full font-extrabold text-xl py-2 text-center mx-auto rounded-md bg-sbc-yellow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
            >
              <path d="M12 5l0 14"></path>
              <path d="M5 12l14 0"></path>
            </svg>
            Nueva venta
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Ventas