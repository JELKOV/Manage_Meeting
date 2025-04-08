import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          date={meetup.date}
          time={meetup.time}
          capacity={meetup.capacity}
          createdAt={meetup.createdAt}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
