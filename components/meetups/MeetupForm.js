import { useEffect, useRef } from "react";
import Card from "../ui/Card";
import classes from "./MeetupForm.module.css";

function MeetupForm({ mode = "create", initialData = {}, onSubmit }) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();
  const dateInputRef = useRef();
  const timeInputRef = useRef();
  const capacityInputRef = useRef();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      titleInputRef.current.value = initialData.title || "";
      imageInputRef.current.value = initialData.image || "";
      addressInputRef.current.value = initialData.address || "";
      descriptionInputRef.current.value = initialData.description || "";
      dateInputRef.current.value = initialData.date || "";
      timeInputRef.current.value = initialData.time || "";
      capacityInputRef.current.value = initialData.capacity || "";
    }
  }, [mode, initialData]);

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredTime = timeInputRef.current.value;
    const enteredCapacity = parseInt(capacityInputRef.current.value);

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
      date: enteredDate,
      time: enteredTime,
      capacity: enteredCapacity,
    };

    onSubmit(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="date">Date</label>
          <input type="date" required id="date" ref={dateInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="time">Time</label>
          <input type="time" required id="time" ref={timeInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="capacity">Capacity</label>
          <input
            type="number"
            required
            id="capacity"
            ref={capacityInputRef}
            min="1"
          />
        </div>
        <div className={classes.actions}>
          <button>{mode === "edit" ? "Update Meetup" : "Add Meetup"}</button>
        </div>
      </form>
    </Card>
  );
}

export default MeetupForm;
