"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllDocuments, addDocument } from "../utils/indexeddb";

export default function HomePage() {
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

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Your Documents</h1>
      <button
        onClick={handleCreateDocument}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        Create New Document
      </button><ul className="space-y-4">
  {documents.map((doc) => (
    <li key={doc.id} className="border-b pb-2">
      <Link
        href={`/document/${doc.id}`}
        className="text-blue-500 hover:underline"
      >
        {doc.title}
      </Link>
      <p className="text-gray-600 text-sm">
        Created on: {new Date(doc.timestamp).toLocaleString()}
      </p>
    </li>
  ))}
</ul>

    </div>
  );
}
