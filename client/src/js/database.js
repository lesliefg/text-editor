import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

export const putDb = async (content) => {
  console.log("PUT to the database");
  // Connect to the DB and version we'd like to use.
  const contactDb = await openDB("jate", 1);
  // Creating new transaction and defining the DB and data privileges.
  const tx = contactDb.transaction("jate", "readwrite");
  // Open object store.
  const store = tx.objectStore("jate");
  // Use the .add() method on the store and pass in the content.
  const req = store.put({ id: 1, value: content });
  // Confirm data was added
  const res = await req;
  console.log("Data saved to the database", res);
};

export const getDb = async () => {
  console.log("GET from the database");
  // Connect to the DB and version we'd like to use.
  const contactDb = await openDB("jate", 1);
  // Creating new transaction and defining the DB and data privileges.
  const tx = contactDb.transaction("jate", "readonly");
  // Open object store.
  const store = tx.objectStore("jate");
  // Use the .getAll() method to get all data in the DB.
  const req = store.getAll();
  // Confirm data was added
  const res = await req;
  console.log("result.value", res);
  return res?.value;
};

initdb();
