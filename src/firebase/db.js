import { groupBy } from 'lodash'
import moment from 'moment'
import FirebaseApp from './index'
import {
    getFirestore,
    doc,
    collection,
    addDoc,
    setDoc,
    getDocs,
    getDoc,
    getDocFromCache,
    where,
    query
} from 'firebase/firestore'

const db = getFirestore(FirebaseApp)

class DataBase {
    static async writeTask(collectionName, docName, groupName, taskId, data) {
        try {
            let result = null
            let docFire = doc(
                db,
                collectionName,
                docName,
                groupName ? 'Group' : 'Tasks',
                taskId
            )

            await setDoc(docFire, data)

            return `Doc ${taskId} foi Criado`
        } catch (error) {
            return error
        }
    }
    static async setReadTask(collectionName, docName, groupName, taskId, data) {
        try {
            let docFire = doc(
                db,
                collectionName,
                docName,
                groupName || 'Tasks',
                taskId
            )
            await setDoc(docFire, data, { merge: true })

            return `Doc ${taskId} Lido`
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
    static async readTasks(collectionName, docName) {
        try {
            const docSnap = await getDocs(
                collection(db, collectionName, docName, 'Tasks')
            )

            let result = []

            docSnap.forEach((doc) => {
                result.push(doc.data())
            })

            return result
        } catch (error) {
            return error.message
        }
    }
    static async readGroupedTasks(collectionName, docName) {
        try {
            const docSnap = await getDocs(
                collection(db, collectionName, docName, 'Group')
            )

            const result = []

            docSnap.forEach((doc) => {
                result.push(doc.data())
            })

            const teste = groupBy(result, (i) => {
                return i.group
            })

            const groupedTasksNames = Object.keys(teste).map((a) => a)

            const groupedTasks = groupedTasksNames.map((group) => {
                let obj = {
                    group: group,
                    data: teste[group]
                }

                return obj
            })

            return groupedTasks
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
