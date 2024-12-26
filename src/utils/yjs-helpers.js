import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

const docsMap = new Map(); // Map to store Y.Docs for each room/document

/**
 * Retrieve or create a Y.Doc for a specific document (room).
 * @param {string} docId - The unique ID of the document.
 * @returns {Y.Doc} The Y.Doc for the specified document.
 */
function getYDoc(docId) {
  if (!docsMap.has(docId)) {
    const newDoc = new Y.Doc();
    const provider = new WebrtcProvider(docId, newDoc);

    docsMap.set(docId, { yDoc: newDoc, provider });

    // Optional: Log or handle syncing events
    provider.on('synced', () => {
      console.log(`Synced with room: ${docId}`);
    });

    console.log(`New Y.Doc created for document: ${docId}`);
  }

  return docsMap.get(docId).yDoc;
}

/**
 * Cleanup logic for a document.
 * Call this when the user leaves a document or room.
 * @param {string} docId - The unique ID of the document.
 */
function cleanupYDoc(docId) {
  if (docsMap.has(docId)) {
    const { provider } = docsMap.get(docId);
    provider.destroy(); // Clean up WebRTC provider
    docsMap.delete(docId); // Remove the document from the map
    console.log(`Cleaned up Y.Doc for document: ${docId}`);
  }
}

export { getYDoc, cleanupYDoc };
