import { groupBy } from 'lodash'
import FirebaseApp from './index'
import {
    initializeFirestore,
    getFirestore,
    doc,
    collection,
    addDoc,
    setDoc,
    getDocs,
    getDoc,
    deleteDoc,
    getDocsFromCache,
    where,
    query,
    enableIndexedDbPersistence,
    CACHE_SIZE_UNLIMITED
} from 'firebase/firestore'

const db = initializeFirestore(FirebaseApp, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED
})

enableIndexedDbPersistence(db)

function dbWritePromice(functionPromice) {
    if (window.navigator.onLine) {
        console.log('Online')
        return functionPromice
    } else {
        console.log('Off')
        return Promise.resolve()
    }
}

class DataBase {
    static async writeTask(collectionName, docName, groupName, taskId, data) {
        try {
            let docFire = doc(
                db,
                collectionName,
                docName,
                groupName ? 'Group' : 'Tasks',
                taskId
            )

            await dbWritePromice(setDoc(docFire, data))

            return `Doc ${data.id} foi Criado`
        } catch (error) {
            return error.message
        }
    }
    static async delTask(collectionName, docName, groupName, taskId) {
        try {
            let docFire = doc(
                db,
                collectionName,
                docName,
                groupName || 'Tasks',
                taskId
            )

            await dbWritePromice(deleteDoc(docFire))

            return `Doc ${taskId} Lido`
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

            await dbWritePromice(setDoc(docFire, data, { merge: true }))

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
            let docSnap = []

            if (window.navigator.onLine) {
                docSnap = await getDocs(
                    collection(db, collectionName, docName, 'Tasks')
                )
            } else {
                docSnap = await getDocsFromCache(
                    collection(db, collectionName, docName, 'Tasks')
                )
            }

            let result = []

            docSnap.forEach((doc) => {
                result.push(doc.data())
            })

            return result
        } catch (error) {
            return error.message
        }
    }
    static async readTasksGroup(collectionName, docName, filter) {
        try {
            let doc = collection(db, collectionName, docName, 'Group')
            let q = query(doc, where('group', '==', filter))

            let docSnap = []

            if (window.navigator.onLine) {
                docSnap = await getDocs(q)
            } else {
                docSnap = await getDocsFromCache(q)
            }

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
            let docSnap = []

            if (window.navigator.onLine) {
                docSnap = await getDocs(
                    collection(db, collectionName, docName, 'Group')
                )
            } else {
                docSnap = await getDocsFromCache(
                    collection(db, collectionName, docName, 'Group')
                )
            }

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
    static async readGrouped(collectionName, docName) {
        try {
            let docSnap = []

            if (window.navigator.onLine) {
                docSnap = await getDocs(
                    collection(db, collectionName, docName, 'Group')
                )
            } else {
                docSnap = await getDocsFromCache(
                    collection(db, collectionName, docName, 'Group')
                )
            }

            const result = []

            docSnap.forEach((doc) => {
                result.push(doc.data())
            })

            const teste = groupBy(result, (i) => {
                return i.group
            })

            const groupedTasksNames = Object.keys(teste).map((a) => a)

            return groupedTasksNames
        } catch (error) {
            return error.message
        }
    }
    static async readAllTasks(collectionName, docName) {
        try {
            let queryGroup = query(
                collection(db, collectionName, docName, 'Group')
            )
            let queryTasks = query(
                collection(db, collectionName, docName, 'Tasks')
            )

            let docInGroup = []

            let docInTasks = []

            if (window.navigator.onLine) {
                docInGroup = await getDocs(queryGroup)

                docInTasks = await getDocs(queryTasks)
            } else {
                docInGroup = await getDocsFromCache(queryGroup)

                docInTasks = await getDocsFromCache(queryTasks)
            }

            const docs = []

            const data = []

            docInGroup.forEach((doc) => {
                data.push(doc.data())
            })

            docInTasks.forEach((doc) => {
                data.push(doc.data())
            })

            data.forEach((doc) => {
                let obj = {
                    title: doc.title,
                    description: doc.description,
                    type: doc.type,
                    read: doc.read,
                    date: doc.date,
                    color: '#3bb574fb'
                }
                if (doc.type === 'task') {
                    obj.color = 'green'

                    docs.push(obj)
                }
                if (doc.type === 'event') {
                    obj.color = 'red'

                    docs.push(obj)
                }
                if (doc.type === 'reminder') {
                    obj.color = 'blue'

                    docs.push(obj)
                }
            })

            return docs
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
