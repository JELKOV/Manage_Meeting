/**
 * [임시 API] 기존 meetup 문서에 creatorId 필드 추가
 *
 * 테스트용 계정의 ObjectId를 모든 기존 meetup 문서에 추가
 * (운영 전환 시 제거 권장)
 */
import clientPromise from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    // 필드가 없는 경우에만 creatorId 추가
    const filter = {
      creatorId: { $exists: false },
    };

    // 관리자 ObjectId를 여기에 입력하세요!
    const defaultUserId = "67f4080388d21e119c68d755";

    const update = {
      $set: {
        creatorId: defaultUserId,
      },
    };

    const result = await meetupsCollection.updateMany(filter, update);

    res.status(200).json({
      message: "creatorId field added",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "update failed",
      error: error.message,
    });
  }
}
