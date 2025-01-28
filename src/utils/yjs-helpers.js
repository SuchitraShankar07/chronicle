import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
//implementation considering the entire app to be one workspace, upgrading this in iter2 to make diff workspaces
const docsMap = new Map(); 


function getYDoc(docId) {
  if (!docsMap.has(docId)) {
    const newDoc = new Y.Doc();
    const provider = new WebrtcProvider(docId, newDoc);

    docsMap.set(docId, { yDoc: newDoc, provider });
    provider.on('synced', () => {
      console.log(`Synced with room: ${docId}`);
    });

    console.log(`New Y.Doc created for document: ${docId}`);
  }

  return docsMap.get(docId).yDoc;
}
//call this when user leaves a doc/ by extension a room
function cleanupYDoc(docId) {
  if (docsMap.has(docId)) {
    const { provider } = docsMap.get(docId);
    provider.destroy(); 
    docsMap.delete(docId); 
    console.log(`Cleaned up Y.Doc for document: ${docId}`);
  }
}

export { getYDoc, cleanupYDoc };
