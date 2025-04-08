// 수정 페이지 컴포넌트: 기존 데이터를 수정할 수 있도록 구성
import { getServerSession } from "next-auth";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { authOptions } from "../../api/auth/[...nextauth]";
import MeetupForm from "../../../components/meetups/MeetupForm";
import clientPromise from "../../../lib/db";
import { ObjectId } from "mongodb";

export default function EditMeetupPage({ meetup }) {
  const router = useRouter();

  // 수정 버튼 클릭 시 호출되는 함수
  async function updateMeetupHandler(updateData) {
    const response = await fetch(`/api/edit/${meetup.id}`, {
      method: "PUT", // PUT 요청으로 수정
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // 수정 완료 후 해당 모임 상세 페이지로 이동
      router.replace(`/${meetup.id}`);
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Fix a Meetup</title>
        <meta
          name="description"
          content="Fix your own meetup and create amazing networking opportunities"
        />
      </Head>
      {/* 수정 모드로 MeetupForm 재사용, 기존 데이터는 initialData로 전달 */}
      <MeetupForm
        mode="edit"
        initialData={meetup}
        onSubmit={updateMeetupHandler}
      />
    </Fragment>
  );
}

// SSR: 작성자 인증 및 데이터 전달
export async function getServerSideProps(context) {
  const { meetupId } = context.params; // meetupId는 동적 라우트 param으로부터 추출

  // 로그인 세션 확인
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    // 로그인하지 않은 경우 로그인 페이지로 리디렉션
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  // MongoDB 접속
  const client = await clientPromise;
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  // 해당 meetup 데이터 조회
  const meetup = await meetupsCollection.findOne({
    _id: ObjectId.createFromHexString(meetupId),
  });

  if (!meetup) {
    // 해당 ID의 meetup이 없을 경우 404 처리
    return { notFound: true };
  }

  // 작성자가 아닌 경우 접근 차단
  if (meetup.creatorId !== session.user.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // 작성자 인증 성공 시 props로 데이터 전달
  return {
    props: {
      meetup: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        date: meetup.date || "",
        time: meetup.time || "",
        capacity: meetup.capacity || "",
      },
    },
  };
}
