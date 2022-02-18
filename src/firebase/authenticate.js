import FirebaseApp from './index'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    updateProfile
} from 'firebase/auth'

const Auth = getAuth(FirebaseApp)
const CreateEmail = createUserWithEmailAndPassword
const SignEmail = signInWithEmailAndPassword
const SignPopup = signInWithPopup
const SignGoogle = GoogleAuthProvider
const Logout = signOut
const Provider = new GoogleAuthProvider()
const update = updateProfile

class Authenticate {
    static async getUser() {
        try {
            const user = Auth.currentUser

            return user
        } catch (error) {
            return error.message
        }
    }
    static async updateUser(data) {
        try {
            const user = await update(Auth.currentUser, data)

            return 'Usuário Atualizado'
        } catch (error) {
            return error.message
        }
    }
    static async createUser(email, password, name) {
        try {
            const userCreated = await CreateEmail(Auth, email, password)

            if (userCreated) {
                await Authenticate.updateUser({
                    displayName: this.name
                })
                const user = await Authenticate.getUser()

                return user
            }
        } catch (error) {
            return error.message
        }
    }
    static async signEmail(email, password) {
        try {
            const user = await SignEmail(Auth, email, password)

            return user
        } catch (error) {
            return error.message
        }
    }
    static async logout() {
        try {
            await Logout(Auth)

            return 'Usuario deslogado'
        } catch (error) {
            return error.message
        }
    }
    static async signPopup() {
        try {
            const result = await SignPopup(Auth, Provider)

            return result
        } catch (error) {
            return error.message
        }
    }
    static async signGoogle(result) {
        try {
            const user = await SignGoogle.credentialFromResult(result)

            return user
        } catch (error) {
            return error.message
        }
    }
}

export default Authenticate
