import { useSession } from "next-auth/react";
import KakaoMap from "../map/KaKaoMap";
import classes from "./MeetupDetail.module.css";
import { format } from "date-fns";
import ParticipationControls from "./ParticipationControls";

function MeetupDetail(props) {
  const {
    id,
    image,
    title,
    address,
    description,
    date,
    time,
    capacity,
    createdAt,
    isEditable = false,
    onEdit,
    onDelete,
  } = props;

  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      <div className={classes.extra}>
        <h1>{title}</h1>
        <p>{description}</p>
        {userId && (
          <ParticipationControls
            meetupId={id}
            userId={userId}
            capacity={capacity}
          />
        )}
        <p>
          📅 <strong>날짜:</strong> {date}
        </p>
        <p>
          🕒 <strong>시간:</strong> {time}
        </p>
        {createdAt && (
          <p>
            📝 <strong>게시 날짜:</strong>{" "}
            {format(new Date(createdAt), "yyyy-MM-dd HH:mm")}
          </p>
        )}
        {isEditable && (
          <div className={classes.actions}>
            <button onClick={onEdit}>✏️ 수정</button>
            <button onClick={onDelete}>🗑️ 삭제</button>
          </div>
        )}
      </div>
      <div className={classes.extra}>
        <p>
          <strong>주소:</strong>
          {address}
        </p>
      </div>
      <KakaoMap address={address} />
    </section>
  );
}

export default MeetupDetail;
