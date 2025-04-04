// lib/db.js
import { MongoClient } from "mongodb";

// .env.development.local에 정의된 MongoDB 접속 정보 로딩
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cluster = process.env.MONGODB_CLUSTER;
const dbName = process.env.MONGODB_DB;
const appName = process.env.MONGODB_APP_NAME;

// 필수 환경변수가 누락된 경우 에러를 발생시켜 앱 실행을 중단
if (!username || !password || !cluster || !dbName || !appName) {
  throw new Error("Please define all MongoDB credentials in .env.development.local");
}

// MongoDB 연결 URI 문자열 구성
const uri = `mongodb+srv://${username}:${password}@${cluster}/${dbName}?retryWrites=true&w=majority&appName=${appName}`;

// MongoClient 인스턴스와 Promise 초기화
let client;
let clientPromise;

// 개발 환경에서는 핫 리로딩에 대비해 MongoClient를 글로벌 객체에 저장하여 재사용
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // 프로덕션 환경에서는 매번 새 클라이언트를 생성해 연결
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
