// lib/db.js
import { MongoClient } from "mongodb";

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;
const dbName = process.env.MONGODB_DB;
const appName = process.env.MONGODB_APP_NAME;

if (!username || !password || !cluster || !dbName || !appName) {
  throw new Error("Please define all MongoDB credentials in .env.development.local");
}

const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=${appName}`;

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
