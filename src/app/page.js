"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import RecentFiles from "../components/RecentFiles";
import UploadArea from "../components/UploadArea";
import FileList from "../components/FileList";
import Sidebar from "../components/Sidebar";
import { getAllDocuments, addDocument } from "../utils/indexeddb";

export default function Home() {
  const [files, setFiles] = useState([]);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    async function fetchDocuments() {
      const docs = await getAllDocuments();
      setDocuments(docs);
    }
    fetchDocuments();
  }, []);

  const handleCreateDocument = async () => {
    const newDoc = {
      id: crypto.randomUUID(),
      title: "Untitled Document",
      content: "",
      timestamp: Date.now(),
    };
    await addDocument(newDoc);
    setDocuments((prevDocs) => [...prevDocs, newDoc]);
  };

  const handleFileUpload = (uploadedFiles) => {
    const newFiles = Array.from(uploadedFiles).map((file) => ({
      name: file.name,
      shared: "N/A",
      size: `${(file.size / 1024).toFixed(2)} KB`, 
      modified: new Date().toLocaleDateString(),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  return (
    <div className="flex" style={{ backgroundColor: "#1d1e22" }}>
      <Sidebar />
      <div className="flex-1 p-12">
        <Header />
        <RecentFiles />
        <UploadArea onFileUpload={handleFileUpload} />

        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-4 text-white">
            Your Documents
          </h1>
          <button
            onClick={handleCreateDocument}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
          >
            Create New Document
          </button>
          <ul className="space-y-4">
            {documents.map((doc) => (
              <li key={doc.id} className="border-b pb-2 text-white">
                <Link
                  href={`/document/${doc.id}`}
                  className="text-blue-400 hover:underline"
                >
                  {doc.title}
                </Link>
                <p className="text-gray-400 text-sm">
                  Created on: {new Date(doc.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <FileList files={files} />
      </div>
    </div>
  );
}
