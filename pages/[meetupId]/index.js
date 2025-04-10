import { ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import clientPromise from "../../lib/db";
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

function MeetupDetails(props) {
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
    creatorId,
  } = props.meetupData;


  const router = useRouter();
  const { data: session } = useSession();

  const userIsCreator = session?.user?.id === creatorId;

  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      text: "되돌릴 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      const response = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.replace("/");
      } else {
        Swal.fire("에러", "삭제 중 오류 발생", "error");
      }
    }
  };

  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        id={id}
        image={image}
        title={title}
        address={address}
        description={description}
        date={date}
        time={time}
        capacity={capacity}
        createdAt={createdAt}
        isEditable={userIsCreator}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Fragment>
  );
}

// 특정 meetupId에 해당하는 데이터를 사전 렌더링 시 미리 가져오는 함수
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId; // 동적 경로에서 meetupId 추출

  // MongoDB에 연결
  const client = await clientPromise;
  const db = client.db();

  // meetups 컬렉션 접근
  const meetupsCollection = db.collection("meetups");

  // 해당 meetupId를 가진 하나의 문서 조회
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId.createFromHexString(meetupId), // 문자열 ID를 ObjectId로 변환
  });

  // 조회한 데이터를 props로 반환하여 해당 페이지에 전달
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        date: selectedMeetup.date || null,
        time: selectedMeetup.time || null,
        capacity: selectedMeetup.capacity || null,
        createdAt: selectedMeetup.createdAt
          ? selectedMeetup.createdAt.toString()
          : null,
        creatorId: selectedMeetup.creatorId || null,
      },
    },
  };
}

// 동적 경로를 사전 생성할 때 사용되는 함수
export async function getStaticPaths() {
  // MongoDB에 연결
  const client = await clientPromise;
  const db = client.db();

  // meetups 컬렉션 접근
  const meetupsCollection = db.collection("meetups");

  // 모든 meetup의 _id만 가져옴 (필요한 필드만 선택)
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  // 각 meetup의 ID를 문자열로 변환해 경로 배열 생성
  return {
    fallback: 'blocking', // 정의된 경로가 불확실 할수 있음을 알림
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export default MeetupDetails;
