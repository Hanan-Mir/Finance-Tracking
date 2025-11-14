function Expenses({value,imgPath,heading,amount}) {
    console.log(value)
  return (
    <div className="w-full md:h-[15vh] shadow-box md:px-5 md:py-2 rounded-lg bg-white">
      <div className="flex md:items-center md:justify-between">
        <div className="flex md:items-center">
          <img src={imgPath} alt="" className="w-10" />
          <h1>{heading}</h1>
        </div>
        <h2>{amount}</h2>
      </div>
      <div className="relative md:mt-4">
      <progress value={value} max="100" class="w-full h-4 rounded-lg overflow-hidden"></progress>
      <p className="z-10 md:absolute md:top-0 md:left-3 text-white ">{value}%</p>
      </div>
    </div>
  );
}

export default Expenses;
