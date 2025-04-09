// 참여 상태 확인 및 참여하기 API
import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/db";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("participants");

  if (req.method === "POST") {
    const { meetupId, userId } = req.body;

    // 이미 참여했는지 확인
    const existing = await collection.findOne({ meetupId, userId });
    if (existing) {
      return res.status(400).json({ message: "이미 참여한 모임입니다." });
    }

    // meetupId 유효성 검증 및 데이터 조회
    let meetup;
    try {
      meetup = await db
        .collection("meetups")
        .findOne({ _id: new ObjectId(meetupId) });
    } catch (error) {
      return res.status(400).json({ message: "잘못된 meetupId입니다." });
    }
    if (!meetup) {
      return res.status(404).json({ message: "모임을 찾을 수 없습니다." });
    }

    // 인원 제한 초과 검사
    const totalJoined = await collection.countDocuments({ meetupId });
    if (totalJoined >= meetup.capacity) {
      return res.status(400).json({ message: "모임 정원이 초과되었습니다." });
    }

    // 참여 정보 저장
    await collection.insertOne({ meetupId, userId });
    return res.status(201).json({ message: "참여 완료" });
  }

  if (req.method === "GET") {
    const { meetupId, userId } = req.query;
    const existing = await collection.findOne({ meetupId, userId });
    return res.status(200).json({ joined: !!existing });
  }

  if (req.method === "DELETE") {
    const { meetupId, userId } = req.body;
    await collection.deleteOne({ meetupId, userId });
    return res.status(200).json({ message: "참여 취소 완료" });
  }
}
