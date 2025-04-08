/**
 * [임시 유틸 API] 누락된 meetup 필드 보완용
 * 
 * 기능:
 * - date, time, capacity, createdAt 필드가 없는 문서를 찾아 기본값으로 채움
 * - 데이터를 일괄적으로 마이그레이션할 때 유용
 *
 * 사용 후 삭제하거나 비활성화 권장 (보안 및 안정성 목적)
 *
 * 사용법 (브라우저 콘솔 or Postman 등에서 실행):
 *
 * 브라우저 콘솔 예시:
 * ```js
 * fetch("/api/fix-meetups-fields", {
 *   method: "POST",
 * })
 *   .then((res) => res.json())
 *   .then((data) => console.log("업데이트 결과:", data))
 *   .catch((err) => console.error("에러:", err));
 * ```
 */
  

import clientPromise from "../../lib/db";

export default async function handler(req, res) {
  // POST 요청만 허용
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Not Allowed" });
  }

  try {
    // MongoDB 연결
    const client = await clientPromise;
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    // 필드 누락 조건 (OR 조건으로 필드 존재 여부 확인)
    const filter = {
      $or: [
        { date: { $exists: false } },
        { time: { $exists: false } },
        { capacity: { $exists: false } },
        { createdAt: { $exists: false } },
      ],
    };

    // 기본값으로 필드 추가
    const update = {
      $set: {
        date: "2025-04-15",            // 임시 날짜
        time: "19:00",                 // 임시 시간
        capacity: 15,                  // 기본 최대 인원 수
        createdAt: new Date(),         // 현재 날짜 기준 생성일
      },
    };

    // updateMany로 다수 문서 업데이트
    const result = await meetupsCollection.updateMany(filter, update);

    res.status(200).json({
      message: "fields updated",        // 응답 메시지
      modifiedCount: result.modifiedCount, // 수정된 문서 수
    });
  } catch (error) {
    res.status(500).json({
      message: "failed update",
      error: error.message,
    });
  }
}
