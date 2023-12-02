import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const LogoAnimation = () => {

  const navigate = useNavigate();

  useEffect(() => {   
    const animationTimeout = setTimeout(() => {
      navigate("/checkrole");
    }, 4000); 
    return () => clearTimeout(animationTimeout);
  }, [navigate]);
  
  return (
    <div className='bg-blue-light flex items-center align-middle justify-center' style={{ height: '100vh'}}>
      <div className="flex sm:flex-row flex-col justify-center items-center text-center opacity-0 transition-opacity duration-1000 animation-fade-in-out">
        <img className="w-28 h-28 sm:w-32 sm:h-32" src="/logo.svg" alt="Quick Parking" />
        <div className="mt-2 sm:mt-0 sm:ml-4 flex flex-col">
          <div className="mt-3 sm:mt-0  text-2xl sm:text-4xl text-blue-dark font-bold flex justify-start">Quick Parking</div>
          <div className="mt-2 text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow to-yellow-dark flex justify-start">Time saved daily.</div>
        </div>
      </div>
    </div>
  );
};

export default LogoAnimation;

