export const AlertCard = ({ title, time, level }) => {
  const color =
    level === "High" ? "bg-red-500" : level === "Medium" ? "bg-yellow-500" : "bg-green-500";
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all">
      <div className="flex justify-between items-center mb-2">
        <span className={`${color} px-3 py-1 text-xs rounded-full font-semibold`}>
          {level} Alert
        </span>
        <span className="text-gray-400 text-sm">{time}</span>
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
};
