function TransactionCard({name,value,comparePercentage}) {
    return (
        <div className="card">
          <h1 className="font-bold text-[2rem]">{name}</h1>
          <div className="flex md:justify-between md:items-center">
            <div className="py-2">
              <p className="text-[1.5rem] font-bold">{value} ₹</p>
              <p className="text-[#969696]">vs last month</p>
            </div>
            <div className="h-[50%] flex gap-1 items-center justify-center border border-red-600  rounded-[10px] px-2 hover:cursor-pointer">
              <img src={`${comparePercentage>0?'/images/up.png':'/images/down.png'}`} alt="" className="w-4 h-4 p-0" />
              <p className="p-0 text-[15px] text-red-600">{comparePercentage}%</p>
            </div>
          </div>
        </div>
    )
}

export default TransactionCard

