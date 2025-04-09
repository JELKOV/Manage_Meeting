import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]"; //
import MeetupForm from "../../components/meetups/MeetupForm";

// 새 모임 등록 페이지 컴포넌트
function NewMeetupPage() {
  const router = useRouter();

  // 모임 등록 핸들러 함수
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/create/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      router.replace("/"); // 등록 후 메인 페이지로 이동
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetup and create amazing networking opportunities"
        />
      </Head>
      <MeetupForm onSubmit={addMeetupHandler} />
    </Fragment>
  );
}

// SSR에서 로그인 여부 확인 (비로그인 시 로그인 페이지로 이동)
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin", // 로그인 안 되어 있으면 이동
        permanent: false,
      },
    };
  }

  return {
    props: {}, // 로그인 상태 유지 시 페이지 렌더링
  };
}

export default NewMeetupPage;
