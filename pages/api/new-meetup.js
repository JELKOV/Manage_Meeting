// pages/api/new-meetup.js

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;

    // 1. POST 요청 확인
    // 2. req.body로부터 데이터 추출

    // TODO: 이곳에서 데이터베이스에 저장하는 작업 진행 예정

    res.status(201).json({ message: "Meetup inserted!" });
  }
}
