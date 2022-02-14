import FirebaseApp from './index'
import {
    getFirestore,
    doc,
    collection,
    addDoc,
    setDoc,
    getDoc,
    getDocFromCache,
    where,
    query
} from 'firebase/firestore'

const db = getFirestore(FirebaseApp)

class DataBase {
    static async writeDoc(collectionName, docName, groupName, taskId, data) {
        try {
            let result = await addDoc(
                collection(db, collectionName, docName, groupName),
                data,
                {
                    merge: true
                }
            )

            // if (taskId) {
            //     result = await
            // } else {
            //     result = await
            // }
            return result
        } catch (error) {
            return error
        }
    }
    static async writeSimpleDoc(collectionName, docName, data) {
        try {
            let result = null

            if (docName) {
                result = await setDoc(doc(db, collectionName, docName), data, {
                    merge: true
                })
            } else {
                result = await addDoc(collection(db, collectionName), data)
            }

            return result
        } catch (error) {
            return error.message
        }
    }
    static async readSimpleDoc(collectionName, docName) {
        try {
            const docSnap = await getDoc(doc(db, collectionName, docName))

            return docSnap.data()
        } catch (error) {
            return error.message
        }
    }
    static async readSimpleCollection(collectionName) {
        try {
            const querySnapshot = await getDoc(collection(db, collectionName))

            const result = []

            querySnapshot.forEach((doc) => {
                result.push(doc.data())
            })

            return result
        } catch (error) {
            return error.message
        }
    }
}

export default DataBase
