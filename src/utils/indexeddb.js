import * as Y from "yjs";

const dbName = "ChronicleDB";
const storeName = "documents";
//rewritten, to fix the issue of a bytearray for each character
export async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}


export async function saveDocument(id, ydoc) {
  const db = await openDB();
  const serializedDoc = Y.encodeStateAsUpdate(ydoc); // Serialize the Y.Doc state
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put({ id, content: serializedDoc }); // Save the serialized state
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllDocuments() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function addDocument(doc) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add(doc); //this is where i start crying.
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
export async function loadDocument(id, ydoc) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(id);
    request.onsuccess = () => {
      const result = request.result;
      if (result) {
        Y.applyUpdate(ydoc, result.content); // Apply the stored state to the Y.Doc
        resolve(ydoc);
      } else {
        reject(new Error("Document not found"));
      }
    };
    request.onerror = () => reject(request.error);
  });
}

