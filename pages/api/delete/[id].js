import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import clientPromise from "../../../lib/db";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const meetupId = req.query.id;

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetup = await meetupsCollection.findOne({
      _id: ObjectId.createFromHexString(meetupId),
    });

    if (!meetup) {
      return res.status(404).json({ message: "Meetup not found" });
    }

    if (meetup.creatorId !== session.user.id) {
      return res.status(403).json({ message: "Forbidden: Not your meetup" });
    }

    await meetupsCollection.deleteOne({ _id: ObjectId.createFromHexString(meetupId) });

    return res.status(200).json({ message: "Meetup deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Deletion failed", error: error.message });
  }
}
