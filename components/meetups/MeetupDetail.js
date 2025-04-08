import KakaoMap from "../map/KaKaoMap";
import classes from "./MeetupDetail.module.css";
import { format } from "date-fns";

function MeetupDetail(props) {
  const {
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

  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      {/* 작성자인 경우에만 수정/삭제 버튼 표시 */}
      {isEditable && (
        <div className={classes.actions}>
          <button onClick={onEdit}>✏️ 수정</button>
          <button onClick={onDelete}>🗑️ 삭제</button>
        </div>
      )}
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>

      <div className={classes.extra}>
        <p>
          📅 <strong>날짜:</strong> {date}
        </p>
        <p>
          🕒 <strong>시간:</strong> {time}
        </p>
        <p>
          👥 <strong>제한인원:</strong> {capacity} people
        </p>
        {createdAt && (
          <p>
            📝 <strong>게시 날짜:</strong>{" "}
            {format(new Date(createdAt), "yyyy-MM-dd HH:mm")}
          </p>
        )}
      </div>
      <KakaoMap address={address} />
    </section>
  );
}

export default MeetupDetail;
