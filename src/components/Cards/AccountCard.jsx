function AccountCard({name,type,amount,translateAmount,zindex}) {
    console.log(translateAmount)
    return (
        <div className={`md:w-[70%] md:h-[32vh] flex md:flex-col md:justify-between px-4 py-14 ring shadow-xl/20 rounded-xl`}>
            <div>
                <h1 className="font-bold text-2xl">{name}</h1>
                <p className="text-2xl text-[#344554] md:mt-2">{type}</p>

            </div>
            <h2 className="text-[#66C68B] text-[3rem]">{amount}</h2>
            
        </div>
    )
}

export default AccountCard
