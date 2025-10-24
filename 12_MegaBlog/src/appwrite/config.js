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

    // Maximum content length to send to Appwrite documents. Adjust if your
    // collection allows longer values. Default to 255 to match current schema.
    MAX_CONTENT_LENGTH = 255

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            if (!userId) {
                console.log('Appwrite service :: createPost :: missing userId - unauthorized')
                throw new Error('Not authenticated')
            }
            // Appwrite documentId must be <=36 chars and match [a-zA-Z0-9.-_]
            const isValidId = (s) => typeof s === 'string' && s.length > 0 && s.length <= 36 && /^[a-zA-Z0-9._-]+$/.test(s)
            const documentId = isValidId(slug) ? slug : ID.unique()

            if (!isValidId(slug)) console.log(`Appwrite service :: createPost :: invalid slug/documentId provided, falling back to generated id (${documentId})`)

            // NOTE: If your Appwrite collection schema does not define a 'slug' attribute,
            // sending it will cause an "Unknown attribute" error. Only include it if
            // the collection has that field. For now, we avoid sending slug as an attribute
            // to prevent the failure while keeping the generated document id.
    // Coerce content to a string and truncate to MAX_CONTENT_LENGTH to match Appwrite
    // collection string limitations (avoid AppwriteException about content type/length).
    const safeContent = typeof content === 'string' ? content.slice(0, this.MAX_CONTENT_LENGTH) : String(content || '').slice(0, this.MAX_CONTENT_LENGTH)
    if (String(content || '').length > this.MAX_CONTENT_LENGTH) console.log(`Appwrite service :: createPost :: content truncated to ${this.MAX_CONTENT_LENGTH} chars to match collection schema`)

        return await this.databases.createDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_TABLE_ID,
                documentId,
                {
            title,
            content: safeContent,
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
    // Ensure content matches Appwrite collection constraints (max length defined above)
    const safeContent = typeof content === 'string' ? content.slice(0, this.MAX_CONTENT_LENGTH) : String(content || '').slice(0, this.MAX_CONTENT_LENGTH)
    if (String(content || '').length > this.MAX_CONTENT_LENGTH) console.log(`Appwrite service :: updatePost :: content truncated to ${this.MAX_CONTENT_LENGTH} chars to match collection schema`)

        return await this.databases.updateDocument(
                conf.APPWRITE_DATABASE_ID,
                conf.APPWRITE_TABLE_ID,
                slug,
                {
            title,
            content: safeContent,
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