function ManageSteps({ stepNumber, stepHeading, steps }) {
  return (
    <div className="md:w-full flex md:flex-col md:items-start steps-card ">
      <p className="text-[#6C767F] font-bold text-2xl">{stepNumber}</p>
      <h1 className="font-montserrat font-bold text-4xl md:mt-5">{stepHeading}</h1>
      <ul className="md:mt-4">
        {steps.map((el) => (
          <li className="md:text-[1.2rem] md:mb-6 text-[#6C767F] before:content-[' '] before:absolute before:-left-1 before:w-8 before:h-8 before:bg-[url('/images/tick.png')] before:bg-contain before:bg-no-repeat ml-8">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageSteps;
