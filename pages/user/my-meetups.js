// 사용자가 참여한 모임 목록을 불러오는 페이지
import { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MeetupList from "../../components/meetups/MeetupList";
import Head from "next/head";

function MyMeetupsPage() {
  const { data: session } = useSession(); // 로그인 세션 정보
  const [joinedMeetups, setJoinedMeetups] = useState([]); // 참여한 모임 목록 상태

  useEffect(() => {
    async function fetchMyMeetups() {
      if (!session?.user?.id) return; // 로그인 상태가 아니면 중단

      // 현재 사용자의 참여한 모임 목록 요청
      const res = await fetch(`/api/my-meetups?userId=${session.user.id}`);
      const data = await res.json();
      setJoinedMeetups(data.meetups); // 상태에 저장
    }
    fetchMyMeetups();
  }, [session]);

  return (
    <Fragment>
      <Head>
        <title>My Meetups</title>
        <meta
          name="description"
          content="Manage your own meetup"
        />
      </Head>
      <MeetupList meetups={joinedMeetups} />;
    </Fragment>
  );
}

export default MyMeetupsPage;
