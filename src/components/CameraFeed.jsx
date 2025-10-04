export const CameraFeed = ({ src }) => (
  <div className="bg-gray-800 rounded-xl p-3 shadow-lg hover:shadow-2xl transition-all">
    <h3 className="font-semibold mb-2">Camera Feed</h3>
    {src ? (
      <video
        src={src}
        controls
        autoPlay
        loop
        muted
        className="w-full rounded-lg"
      />
    ) : (
      <div className="aspect-video bg-gray-700 flex items-center justify-center rounded-lg">
        <span className="text-gray-400">No camera feed</span>
      </div>
    )}
  </div>
);
