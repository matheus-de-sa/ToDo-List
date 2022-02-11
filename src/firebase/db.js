import FirebaseDB from "./index";

const db = FirebaseDB.getFirestore();
const collection = FirebaseDB.collection;
const doc = FirebaseDB.doc;
const addDoc = FirebaseDB.addDoc;
const setDoc = FirebaseDB.setDoc;
const getDoc = FirebaseDB.getDoc;
const getDocCache = FirebaseDB.getDocFromCache;
const where = FirebaseDB.where;
const query = FirebaseDB.query;

class DataBase {
    static async writeSimpleDoc(collectionName, docName, data) {
        try {
            let result = null;

            if (docName) {
                result = await setDoc(doc(db, collectionName, docName), data, {
                    merge: true
                });
            } else {
                result = await addDoc(doc(db, collectionName), data);
            }

            return result;
        } catch (error) {
            return error.message;
        }
    }
    static async readSimpleDoc(collectionName, docName) {
        try {
            const docSnap = await getDoc(doc(db, collectionName, docName));

            return docSnap.data();
        } catch (error) {
            return error.message;
        }
    }
    static async readSimpleCollection(collectionName) {
        try {
            const querySnapshot = await getDoc(collection(db, collectionName));

            const result = [];

            querySnapshot.forEach((doc) => {
                result.push(doc.data());
            });

            return result;
        } catch (error) {
            return error.message;
        }
    }
}

export default DataBase;
