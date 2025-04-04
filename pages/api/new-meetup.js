// pages/api/new-meetup.js
import clientPromise from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, image, address, description } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db();
      const meetupsCollection = db.collection("meetups");

      const result = await meetupsCollection.insertOne({
        title,
        image,
        address,
        description,
      });

      res.status(201).json({ message: "Meetup inserted!", id: result.insertedId });
    } catch (error) {
      res.status(500).json({ message: "DB 저장 중 오류 발생", error: error.message });
    }
  } else {
    res.status(405).json({ message: "허용되지 않은 요청입니다." });
  }
}
