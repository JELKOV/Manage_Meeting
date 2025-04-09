import clientPromise from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "허용되지 않은 메서드입니다." });
  }

  const { meetupId } = req.query;

  if (!meetupId) {
    return res.status(400).json({ message: "meetupId가 필요합니다." });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const count = await db
      .collection("participants")
      .countDocuments({ meetupId });

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "참여 인원 조회 실패", error: error.message });
  }
}