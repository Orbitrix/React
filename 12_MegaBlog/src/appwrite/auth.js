import conf from '../conf.js'
import { Client, Account, ID } from "appwrite";

export class AuthService {
    clint = new Client();
    account = null;

    constructor() {
        this.clint
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.APPWRITE_PROJECT_ID);
        this.account = new Account(this.clint);
    }

    async createAccount({ name, email, password }) {
        try {
            const userAcount = await this.account.create(ID.unique(), name, email, password)
            if (userAcount) {
                // call another method
                return this.login({ email, password })
            } else {
                return userAcount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error)
        }
    }
}

const authService = new AuthService();

export default authService;