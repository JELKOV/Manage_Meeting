import { ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import clientPromise from "../../lib/db";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
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
        id: selectedMeetup._id.toString(), // ObjectId를 문자열로 변환
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
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
    fallback: false, // 정의된 경로 외에는 404 페이지로 처리
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export default MeetupDetails;
