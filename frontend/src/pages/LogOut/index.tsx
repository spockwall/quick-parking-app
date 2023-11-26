// pages/LogOut/index.tsx


const LogOut = () => { 

  return (
    <div>
      <div className='bg-blue-light flex flex-col items-center align-middle justify-center' style={{ height: '100vh' }}>
        <div className="items-center text-center mb-20">
          <span className='text-white text-3xl md:text-4xl font-bold'>See You Next Time.</span>
        </div>
        <div className="flex md:flex-row flex-col justify-center items-center text-center md:mb-16">
          <img className="w-28 h-28 md:w-32 md:h-32" src="/logo.svg" alt="Quick Parking" />
          <div className="mt-2 md:mt-0 md:ml-4 flex flex-col">
            <div className="mt-3 md:mt-0 text-2xl md:text-4xl text-blue-dark font-bold flex justify-start">Quick Parking</div>
            <div className="mt-2 text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow to-yellow-dark flex justify-start">Time saved daily.</div>
          </div>
        </div>
      </div>
    </div>    
  );
};

export default LogOut;

