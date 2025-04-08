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
          <button onClick={onEdit}>✏️ Edit</button>
          <button onClick={onDelete}>🗑️ Delete</button>
        </div>
      )}
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>

      <div className={classes.extra}>
        <p>
          📅 <strong>Date:</strong> {date}
        </p>
        <p>
          🕒 <strong>Time:</strong> {time}
        </p>
        <p>
          👥 <strong>Capacity:</strong> max:{capacity} people
        </p>
        {createdAt && (
          <p>
            📝 <strong>Created At:</strong>{" "}
            {format(new Date(createdAt), "yyyy-MM-dd HH:mm")}
          </p>
        )}
      </div>
    </section>
  );
}

export default MeetupDetail;
