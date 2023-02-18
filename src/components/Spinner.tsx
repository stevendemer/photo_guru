const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-screen-300">
      <div className="grid gap-2">
        <div className="flex items-center justify-center">
          <div className="w-32 h-32 border-b-2 border-gray-900 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
