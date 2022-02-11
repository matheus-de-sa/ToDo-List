import FirebaseAuth from "./index";

const Auth = FirebaseAuth.getAuth();
const CreateEmail = FirebaseAuth.createUserWithEmailAndPassword;
const SignEmail = FirebaseAuth.signInWithEmailAndPassword;
const SignPopup = FirebaseAuth.signInWithPopup;
const SignGoogle = FirebaseAuth.GoogleAuthProvider;
const Logout = FirebaseAuth.signOut;
const Provider = new FirebaseAuth.GoogleAuthProvider();

class Authenticate {
    static async createUser(email, password) {
        try {
            const user = await CreateEmail(Auth, email, password);

            return user;
        } catch (error) {
            return error.message;
        }
    }
    static async signEmail(Auth, email, password) {
        try {
            const user = await SignEmail(Auth, email, password);

            return user;
        } catch (error) {
            return error.message;
        }
    }
    static async logout() {
        try {
            const user = await Logout(Auth);

            return user;
        } catch (error) {
            return error.message;
        }
    }
    static async signPopup() {
        try {
            const result = await SignPopup(Auth, Provider);

            return result;
        } catch (error) {
            return error.message;
        }
    }
    static async signGoogle(result) {
        try {
            const user = await SignGoogle.credentialFromResult(result);

            return user;
        } catch (error) {
            return error.message;
        }
    }
}

export default Authenticate;
