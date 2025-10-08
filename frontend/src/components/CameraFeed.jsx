import { useRef, useEffect } from "react";

export const CameraFeed = ({ src, name, type, detections = [], onDelete }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const drawFrame = () => {
      if (video.readyState >= 2) { // ensure video has loaded enough data
        // match canvas size to video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // draw the current frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // draw detection boxes
        detections.forEach((det) => {
          const { x, y, width, height, label, confidence } = det;

          ctx.strokeStyle = "#00ff00";
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, width, height);

          const labelText = `${label ?? "object"} ${
            confidence ? (confidence * 100).toFixed(1) + "%" : ""
          }`;

          ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
          ctx.fillRect(x, y - 20, ctx.measureText(labelText).width + 8, 20);

          ctx.fillStyle = "#00ff00";
          ctx.font = "16px Arial";
          ctx.fillText(labelText, x + 4, y - 5);
        });
      }

      animationFrameId = requestAnimationFrame(drawFrame);
    };

    video.onplay = () => {
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [src, detections]);

  return (
    <div className="bg-gray-800 rounded-xl p-3 shadow-lg hover:shadow-2xl transition-all relative">
      {/* Delete button */}
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg z-10"
        title="Remove camera"
      >
        ✕
      </button>

      {/* Title */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-white">{name}</h3>
      </div>

      {/* Video & Canvas */}
      {src ? (
        <div className="relative">
          <video
            ref={videoRef}
            src={src}
            autoPlay
            loop={type === "video"}
            muted
            playsInline
            className="w-full rounded-lg"
            onLoadedData={() => videoRef.current.play().catch(() => {})}
          />
          <canvas
            ref={canvasRef}
            className="w-full rounded-lg absolute top-0 left-0 pointer-events-none"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gray-700 flex items-center justify-center rounded-lg">
          <span className="text-gray-400">No camera feed</span>
        </div>
      )}
    </div>
  );
};
