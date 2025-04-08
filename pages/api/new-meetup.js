// pages/api/new-meetup.js
import { getServerSession } from "next-auth";
import clientPromise from "../../lib/db";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // 사용자 세션 확인
    const session = await getServerSession(res, req, authOptions);

    if (!session) {
      return res
        .status(401)
        .json({ message: "인증된 사용자만 사용할수 있습니다." });
    }

    const { title, image, address, description, date, time, capacity } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db();
      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne({
        title,
        image,
        address,
        description,
        date,
        time,
        capacity,
        creatorId: session.user.id,
        createdAt: new Date(),
      });

      res
        .status(201)
        .json({ message: "Meetup inserted!", id: result.insertedId });
    } catch (error) {
      res
        .status(500)
        .json({ message: "DB 저장 중 오류 발생", error: error.message });
    }
  } else {
    res.status(405).json({ message: "허용되지 않은 요청입니다." });
  }
}
