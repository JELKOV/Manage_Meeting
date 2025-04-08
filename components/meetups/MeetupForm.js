import { useEffect, useRef } from "react";
import Card from "../ui/Card";
import classes from "./MeetupForm.module.css";
import PlaceSearch from "../map/PlaceSearch";

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

  const handleAddressSelect = (selectedAddress) => {
    addressInputRef.current.value = selectedAddress;
  };

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
          <label htmlFor="title">모임 이름</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">이미지(링크를 넣어주세요)</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">모임 위치</label>
          <input
            type="text"
            required
            id="address"
            ref={addressInputRef}
            readOnly
            placeholder="지도에서 주소를 선택해주세요"
          />
        </div>
        <PlaceSearch onSelectAddress={handleAddressSelect} />
        <div className={classes.control}>
          <label htmlFor="description">모임 설명</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="date">모임 날짜</label>
          <input type="date" required id="date" ref={dateInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="time">모임 시간</label>
          <input type="time" required id="time" ref={timeInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="capacity">인원제한수</label>
          <input
            type="number"
            required
            id="capacity"
            ref={capacityInputRef}
            min="1"
          />
        </div>
        <div className={classes.actions}>
          <button>{mode === "edit" ? "모임 수정 등록하기" : "모임 새로 등록하기"}</button>
        </div>
      </form>
    </Card>
  );
}

export default MeetupForm;
