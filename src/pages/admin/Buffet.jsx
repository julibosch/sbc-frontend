import BuffetHeader from "../../components/Buffet/BuffetHeader"
import BuffetTable from "../../components/Buffet/BuffetTable"
import { Link } from 'react-router-dom'

const Buffet = () => {
  return (
    <div className='flex flex-col h-full'>
      <BuffetHeader />
      <div className="justify-evenly flex flex-col px-5 ju w-full h-full">
        <BuffetTable />
        <Link to={'/admin/buffet/ventas'} className="w-full font-extrabold text-xl py-2 text-center uppercase mx-auto rounded-md bg-sbc-yellow">Ventas</Link>
      </div>
    </div>
  )
}

export default Buffet