import conf from '../conf.js'
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DatabasesService {
    Client = new Client();
    databases;
    bucket;
}


const databasesService = new DatabasesService
export default databasesService;