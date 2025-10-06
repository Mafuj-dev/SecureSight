export const CameraFeed = ({ src, name, status, onDelete }) => {
  const statusColor = status === "online" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="bg-gray-800 rounded-xl p-3 shadow-lg hover:shadow-2xl transition-all relative">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg"
        title="Remove camera"
      >
        ✕
      </button>

      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{name}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
          {status}
        </span>
      </div>

      {src ? (
        <video src={src} controls autoPlay loop muted className="w-full rounded-lg" />
      ) : (
        <div className="aspect-video bg-gray-700 flex items-center justify-center rounded-lg">
          <span className="text-gray-400">No camera feed</span>
        </div>
      )}
    </div>
  );
};
