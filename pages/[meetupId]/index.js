import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image="https://lh3.googleusercontent.com/gps-cs-s/AB5caB9gaZ7QemAEFHjKjnWRn9r5tyg0dub7uO37nk2WWZ-8OLxI6FHXSID95SJFwOSgXR-oJQsr6Na6h5K2JDNHmaaWw-sOEoxvA6j3BmL6j0XRPOg7kuhXbUuLNhcHtvomKDEQcvqUYA=s1360-w1360-h1020"
      title="신촌 저녁 번개 모임"
      address="서울 서대문구 연세로 12길 34, 커피빈 신촌점"
      description="퇴근 후 가볍게 만나 커피 한 잔하며 이야기 나눠요!"
    />
  );
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  return {
    props: {
      meetupData: {
        image:
          "https://lh3.googleusercontent.com/gps-cs-s/AB5caB9gaZ7QemAEFHjKjnWRn9r5tyg0dub7uO37nk2WWZ-8OLxI6FHXSID95SJFwOSgXR-oJQsr6Na6h5K2JDNHmaaWw-sOEoxvA6j3BmL6j0XRPOg7kuhXbUuLNhcHtvomKDEQcvqUYA=s1360-w1360-h1020",
        id: meetupId,
        title: "신촌 저녁 번개 모임",
        address: "서울 서대문구 연세로 12길 34, 커피빈 신촌점",
        description: "퇴근 후 가볍게 만나 커피 한 잔하며 이야기 나눠요!",
      },
    },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export default MeetupDetails;
