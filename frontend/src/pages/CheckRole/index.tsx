// pages/CheckRole/index.tsx

import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.svg";

const commonButtonClass = "text-white bg-blue-dark hover:bg-blue-exdark focus:outline-none focus:ring-2 focus:ring-blue-exdark rounded-full text-md md:text-xl px-5 py-3.5 text-center me-2 w-full my-5 mx-auto";

const CheckRole = () => { 

  const navigate = useNavigate();

  return (
    <div className='bg-blue-light flex flex-col items-center align-middle justify-center' style={{ height: '100vh' }}>
      <div className='flex justify-center items-center text-center'>
        <img className="w-20 h-20 sm:w-28 sm:h-28" src={Logo} alt="Quick Parking" />
        <div className="ml-3 sm:ml-6 md:ml-10 flex flex-col">
          <div className="text-2xl sm:text-3xl md:text-4xl text-blue-dark font-bold flex justify-start">Quick Parking</div>
          <div className="mt-2 text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow to-yellow-dark flex justify-start">Time saved daily.</div>
        </div>
      </div>   
      <div className="mb-6 mt-12 md:mt-8">
        <span className="text-2xl sm:text-3xl font-bold text-white">Who are you?</span>
      </div>
      
      <div className="flex flex-col items-center align-middle justify-center mt-3 w-1/2 sm:w-2/5 md:w-1/3 lg:w-1/4">
        <button type="button" onClick={() => navigate('/login/staff', { state: { role: 'staff' } })} className={`
        ${commonButtonClass }
      `}>Car Owner</button>      
        <button type="button" onClick={() => navigate('/login/guard', { state: { role: 'guard' } })} className={`
        ${commonButtonClass}
      `}>
          Guard
        </button>
        <button type="button" onClick={() => navigate('/login/admin', { state: { role: 'admin' } })} className={`
        ${commonButtonClass}
      `}>
          Admin
        </button>
      </div>
    </div>
  );
};

export default CheckRole;

