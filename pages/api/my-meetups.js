// 현재 사용자가 참여한 모든 모임 정보를 조회하는 API
import clientPromise from "../../lib/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "허용되지 않은 메서드" });
  }

  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "userId가 필요합니다." });
  }

  const client = await clientPromise;
  const db = client.db();

  // 참여한 모임 ID 리스트 가져오기
  const participantDocs = await db.collection("participants").find({ userId }).toArray();
  const meetupIds = participantDocs.map((doc) => new ObjectId(doc.meetupId));

  // 모임 상세 정보 가져오기
  const meetups = await db.collection("meetups").find({ _id: { $in: meetupIds } }).toArray();

  // 결과 응답
  res.status(200).json({
    meetups: meetups.map((meetup) => ({
      id: meetup._id.toString(),
      title: meetup.title,
      address: meetup.address,
      image: meetup.image,
      date: meetup.date,
      time: meetup.time,
      capacity: meetup.capacity,
      createdAt: meetup.createdAt?.toString(),
    })),
  });
}
