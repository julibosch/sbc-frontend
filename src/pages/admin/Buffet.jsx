import BuffetHeader from "../../components/Buffet/BuffetHeader"
import BuffetTable from "../../components/Buffet/BuffetTable"
import { Link } from 'react-router-dom'

const Buffet = () => {
  return (
    <div className='flex flex-col h-full'>
      <BuffetHeader />
      <div className="justify-evenly flex flex-col px-5 ju w-full h-full">
        <BuffetTable />
        <Link to={'/admin/buffet/ventas'} className="flex items-center justify-center gap-4 text-cta-azul sans-pro shadow-md uppercase w-full font-extrabold text-xl py-2 text-center mx-auto rounded-md bg-sbc-yellow">
          <svg xmlns="http://www.w3.org/2000/svg"  width="26"  height="26"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-building-store"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4" /><path d="M5 21l0 -10.15" /><path d="M19 21l0 -10.15" /><path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" /></svg>
          Ventas
          </Link>
      </div>
    </div>
  )
}

export default Buffet