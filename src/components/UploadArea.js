// components/UploadArea.js
import React from 'react';

export default function UploadArea({ onFileUpload }) {
  const handleUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      onFileUpload(files); // Pass the uploaded files to the parent component
    }
  };

  return (
    <div>
    <h2 className="text-lg font-semibold mb-4">Upload Files</h2>
    <div className="mb-8 p-6 border-dashed border-2 rounded-lg flex items-center justify-center cursor-pointer">
      <input
        type="file"
        multiple
        onChange={handleUpload}
        className="absolute opacity-0 cursor-pointer"
      />
      <span className="text-gray-400">Drag and drop files or click to upload</span>
    </div>
    </div>
  );
}
