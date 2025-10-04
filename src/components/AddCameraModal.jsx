import { useState } from "react";

export const AddCameraModal = ({ onAdd, onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(URL.createObjectURL(selected));
  };

  const handleAdd = () => {
    if (file) {
      onAdd(file);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-96 shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-center text-primary">
          Add Camera Feed
        </h2>

        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-300 mb-4"
        />

        {file && (
          <video
            src={file}
            className="w-full rounded-lg mb-3"
            controls
          />
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!file}
            className={`px-4 py-2 rounded-lg ${
              file ? "bg-primary hover:bg-teal-600" : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
