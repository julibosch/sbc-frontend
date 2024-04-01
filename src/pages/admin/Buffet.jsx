import { ToastContainer } from "react-toastify";
import BuffetHeader from "../../components/Buffet/BuffetHeader";
import BuffetTable from "../../components/Buffet/BuffetTable";

const Buffet = () => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <BuffetHeader />
      <div className="justify-evenly flex flex-col px-5 ju w-full h-full">
        <BuffetTable />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        pauseOnHover
      />
    </div>
  );
};

export default Buffet;
