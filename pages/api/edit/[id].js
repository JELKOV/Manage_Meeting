// [PUT] 요청으로 특정 meetup 데이터를 수정하는 API
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]"; // 인증 옵션 import
import clientPromise from "../../../lib/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const meetupId = req.query.id; // URL 파라미터에서 meetupId 추출

  // PUT 요청만 허용
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // 로그인 세션 확인 (비로그인 사용자는 거절)
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // 요청 본문에서 수정할 데이터 추출
  const { title, image, address, description, date, time, capacity } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    // 기존 meetup 존재 여부 확인
    const existingMeetup = await meetupsCollection.findOne({
      _id: ObjectId.createFromHexString(meetupId),
    });

    if (!existingMeetup) {
      return res.status(404).json({ message: "Meetup not found" });
    }

    // 작성자 본인만 수정 가능 (creatorId 검사)
    if (existingMeetup.creatorId !== session.user.id) {
      return res.status(403).json({ message: "Forbidden: Not your meetup" });
    }

    // 데이터 업데이트
    const result = await meetupsCollection.updateOne(
      { _id: ObjectId.createFromHexString(meetupId) },
      {
        $set: {
          title,
          image,
          address,
          description,
          date,
          time,
          capacity,
        },
      }
    );

    // 수정 완료 응답
    res.status(200).json({ message: "Meetup updated", result });
  } catch (error) {
    // 에러 발생 시 처리
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
}
