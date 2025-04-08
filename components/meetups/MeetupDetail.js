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
  } = props;

  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
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
