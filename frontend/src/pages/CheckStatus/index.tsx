// pages/CheckStatus/index.tsx
const commonButtonClass = "text-white bg-blue-dark hover:bg-blue-exdark focus:outline-none focus:ring-2 focus:ring-blue-exdark rounded-full text-lg md:text-xl px-5 py-2.5 text-center me-2 w-full m-4";

const CheckStatus = () => { 

  const handleClickOpen = () => {
  };

  return (
    <div className='bg-blue-light flex flex-col items-center align-middle justify-center' style={{ height: '100vh' }}>
      {/* Your CheckStatus component logic */}
      <div className="mb-8">
        <span className="text-3xl font-bold text-white">Who are you?</span>
      </div>
      
      <div className="flex flex-col items-center align-middle justify-center mt-4 w-1/2 md:w-1/4">
        <button type="button" onClick={handleClickOpen} className={`
        ${commonButtonClass }
      `}>Car Owner</button>      
        <button type="button" onClick={handleClickOpen} className={`
        ${commonButtonClass}
      `}>
          Guard
        </button>
        <button type="button" onClick={handleClickOpen} className={`
        ${commonButtonClass}
      `}>
          Admin
        </button>
      </div>
    </div>
  );
};

export default CheckStatus;

