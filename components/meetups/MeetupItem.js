import { useRouter } from "next/router";

import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useSession } from "next-auth/react";
import ParticipationControls from "./ParticipationControls";

function MeetupItem(props) {
  const { id, image, title, address, date, time, capacity } = props;

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const router = useRouter();
  function showDetailsHandler() {
    router.push("/" + props.id);
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <p>
            📅 {date} <br />
            🕒 {time}
          </p>
          <address>{address}</address>
        </div>
        {userId && (
          <ParticipationControls
            meetupId={id}
            userId={userId}
            capacity={capacity}
          />
        )}
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>자세히 보기</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
