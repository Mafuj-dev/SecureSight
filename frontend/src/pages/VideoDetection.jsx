import React from "react";
import VideoUpload from "../components/VideoUpload";

export default function VideoDetection() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-green-400">
        Video Detection
      </h2>
      <VideoUpload />
    </div>
  );
}
