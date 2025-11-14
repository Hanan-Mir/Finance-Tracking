function AccountCard({ name, type, amount, translateAmount, zindex }) {
  console.log(translateAmount);
  return (
    <div
      className={`md:w-[75%] md:h-[32vh] flex md:flex-col bg-white md:justify-between px-4 py-14 shadow-box rounded-xl ${zindex==='2' && 'z-20'} ${zindex=='3' && 'z-30'} ${zindex=='0' && 'z-0'}  ${translateAmount==='0' && 'translate-y-0'}  ${translateAmount==='40' && '-translate-y-[75px] -translate-x-[40px]'}  ${translateAmount==='20' && '-translate-y-[40px] -translate-x-[20px]'}`}
    >
      <div>
        <h1 className="font-medium text-2xl">{name}</h1>
        <p className="text-[1.4rem] text-[#344554] md:mt-2">{type}</p>
      </div>
      <h2 className="text-[#66C68B] text-[2rem]">{amount}</h2>
    </div>
  );
}

export default AccountCard;
