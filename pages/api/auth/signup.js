import { hash } from "bcryptjs";
import { hashPassword } from "../../../lib/auth";
import clientPromise from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;

  if (!email || !email.includes("@") || !password || password.length < 6) {
    return res.status(422).json({ message: "입력값을 확인하세요." });
  }

  const client = await clientPromise;
  const db = client.db();
  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser)
    return res.status(422).json({ message: "이미 등록된 이메일입니다." });

  const hashedPassword = await hashPassword(password);

  await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  res.status(201).json({ message: "회원가입 성공" });
}
