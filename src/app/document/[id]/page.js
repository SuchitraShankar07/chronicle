'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import Editor from '../../../components/editor';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import './style.css';

const DocumentPage = ({ params }) => {
  const router = useRouter();
  const [id, setId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [ydoc, setYdoc] = useState(null);

  useEffect(() => {
    (async () => {
      if (params) {
        const unwrappedParams = await params; // Await params if it's a Promise
        setId(unwrappedParams.id);
      }
    })();
  }, [params]);

  useEffect(() => {
    if (id) {
      const ydoc = new Y.Doc();
      setYdoc(ydoc);

      const indexeddbPersistence = new IndexeddbPersistence(id, ydoc);
      indexeddbPersistence.on('synced', () => {
        console.log(`Document ${id} has been loaded from IndexedDB`);
      });

      const provider = new WebrtcProvider(id, ydoc, {signaling:['ws://chroniclesignalling.anuragrao.me:6969']});
      setProvider(provider);

      return () => {
        provider.destroy();
        indexeddbPersistence.destroy();
      };
    }
  }, [id]);

  if (!id || !provider || !ydoc) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col">

      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Chronicle</h1>
        <h1>Document ID: {id}</h1>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Go Back to Home
        </button>
      </nav>

  
      <div className="flex-grow p-4 bg-gray-50">
        <Editor user={{ id, name: 'Anonymous' }} provider={provider} ydoc={ydoc} />
      </div>
    </div>
  );
};

export default DocumentPage;
