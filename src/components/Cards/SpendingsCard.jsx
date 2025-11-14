import Expenses from "./Expenses"

function SpendingsCard() {
    return (
        <div className="w-[50%] md:h-[60vh] flex md:justify-end relative">
            <div className="w-[50%] h-full shadow-box flex md:justify-center md:items-start relative">
                <img src="/images/bag.png" alt="" className="w-15 md:absolute md:top-[-30px]" />

            </div>
            <div className="w-[60%] md:h-[88%] absolute top-20 right-10 flex md:flex-col md:justify-between ">
                <Expenses value='31' heading='Power and energy' imgPath='/images/charging.png' amount='2,795 EUR' />
              
                 <Expenses value='62' heading='Inventory' imgPath='images/inventory.png' amount='2,334 EUR' />
                
                
                     <Expenses value='50' heading='Salary' amount='10998 EUR' imgPath='images/salary.png' />
                

            </div>
            
        </div>
    )
}

export default SpendingsCard
