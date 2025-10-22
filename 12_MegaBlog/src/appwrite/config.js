import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabasesService {
    Client = new Client();
    databases;
    bucket;

    constructor() {
        this.Client
            .setEndpoint(conf.APPWRITE_URL)
            .setProject(conf.APPWRITE_PROJECT_ID);
        this.databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            if (!userId) {
                console.log('Appwrite service :: createPost :: missing userId - unauthorized')
                throw new Error('Not authenticated')
            }
            return await this.databases.createDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_TABLE_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status, }) {
        try {
            return await this.databases.updateDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_TABLE_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_TABLE_ID,
                slug,
            )

            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);

            return false;
        }
    }

    async getPost(slug) {
        try {
            // First, try to fetch by document ID
            return await this.databases.getDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_TABLE_ID,
                slug,
            )
        } catch (error) {
            // If not found by ID, try to find by a 'slug' field in documents
            try {
                const res = await this.databases.listDocuments(
                    conf.APPWRITE_DATABASE_ID,
                    conf.APPWRITE_TABLE_ID,
                    [Query.equal('slug', slug)]
                )

                if (res && res.documents && res.documents.length > 0) return res.documents[0]
            } catch (err) {
                console.log('Appwrite service :: getPost fallback query error', err)
            }

            console.log("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_TABLE_ID,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.APPWRITE_BUCKET_ID,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.APPWRITE_BUCKET_ID,
            fileId
        )
    }
}


const databasesService = new DatabasesService
export default databasesService;