import { useRouter } from "next/router";

import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useSession } from "next-auth/react";
import ParticipationControls from "./ParticipationControls";

function MeetupItem(props) {
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
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>
            📅 {props.date} 🕒 {props.time}
          </p>
        </div>
        {userId && (
          <ParticipationControls
            meetupId={props.id}
            userId={userId}
            capacity={props.capacity}
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
