function DashboardCard({ name, value, showCurrencyCount, showPercentage }) {
  return (
    <div className="dashboard-card">
      <div className="flex md:flex-col md:justify-between md:h-full px-2 py-2">
        <h1 className="font-bold text-[1.5rem]">{name}</h1>

        {showCurrencyCount ? (
          <p className="text-[2rem] font-bold">{value} ₹</p>
        ) : showPercentage ? (
          <p className="text-[2rem] font-bold">{value}%</p>
        ) : (
          <p className="text-[2rem] font-bold">{value}</p>
        )}
      </div>
    </div>
  );
}

export default DashboardCard;
