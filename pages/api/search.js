import clientPromise from "../../lib/db";

export default async function handler(req, res) {
  const keyword = req.query.keyword || "";
  const region = req.query.region || "";
  const date = req.query.date || "";

  const client = await clientPromise;
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const filters = [];

  // keyword가 있다면 title, address, description 검색
  if (keyword) {
    const regex = new RegExp(keyword, "i");
    filters.push({
      $or: [
        { title: { $regex: regex } },
        { address: { $regex: regex } },
        { description: { $regex: regex } },
      ],
    });
  }

  // region이 있다면 address에 포함되는지 검사
  if (region) {
    const regionRegex = new RegExp(region, "i");
    filters.push({ address: { $regex: regionRegex } });
  }

  // date가 있다면 해당 날짜 이후만
  if (date) {
    filters.push({ date: { $gte: date } });
  }

  const query = filters.length > 0 ? { $and: filters } : {};

  const filtered = await meetupsCollection.find(query).toArray();

  res.status(200).json({
    meetups: filtered.map((meetup) => ({
      id: meetup._id.toString(),
      title: meetup.title,
      address: meetup.address,
      image: meetup.image,
      date: meetup.date || null,
      time: meetup.time || null,
      capacity: meetup.capacity || null,
      createdAt: meetup.createdAt ? meetup.createdAt.toString() : null,
    })),
  });
}
