import { useEffect, useState } from "react";
import useJoinMeetup from "../../pages/hooks/useJoinMeetup";
import classes from "./ParticipationControls.module.css";

function ParticipationControls({ meetupId, capacity, userId }) {
  const { join, cancel, joined, loading, error } = useJoinMeetup(
    meetupId,
    userId
  );
  const [currentCount, setCurrentCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      if (!meetupId) return;
      const res = await fetch(`/api/participants/count?meetupId=${meetupId}`);
      const data = await res.json();
      setCurrentCount(data.count);
    }
    fetchCount();
  }, [meetupId, joined]);

  return (
    <div className={classes.container}>
      <button
        onClick={joined ? cancel : join}
        disabled={loading}
        className={`${classes.btn} ${joined ? classes.cancel : classes.join}`}
      >
        {joined ? "참여 취소" : "참여 하기"}
      </button>
      <p className={classes.counter}>
        👥 <strong>참여 인원:</strong> {currentCount} / {capacity}
      </p>
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
}

export default ParticipationControls;
