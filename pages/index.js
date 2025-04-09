// 메인 페이지
import clientPromise from "../lib/db";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import { useRouter } from "next/router";
import SearchLayout from "../components/ui/SearchLayout";

// 메인 페이지 컴포넌트
function HomePage(props) {
  const [filters, setFilters] = useState({ keyword: "", region: "", date: "" });
  const [filteredMeetups, setFilteredMeetups] = useState(props.meetups);
  const router = useRouter();

  useEffect(() => {
    // 라우트 변경 시작 시 호출되는 함수
    const handleRouteChange = (url) => {
      // 외부 URL 또는 다른 경로일 경우 필터 초기화를 하지 않음
      const isNavigatingToHome = url === "/";
      if (!isNavigatingToHome) return;

      // 홈(/)으로 이동할 때만 필터 및 결과 초기화
      // 검색 조건 초기화
      setFilters({ keyword: "", region: "", date: "" }); 
      // 전체 목록 복원
      setFilteredMeetups(props.meetups); 
    };

    // Next.js의 router 이벤트 리스너 등록
    router.events.on("routeChangeStart", handleRouteChange);

    // 클린업 함수 – 컴포넌트가 unmount되거나 의존값이 바뀔 때 이벤트 해제
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router, props.meetups]);

  async function handleSearch({ keyword, region, date }) {
    const query = new URLSearchParams();

    if (keyword) query.append("keyword", keyword);
    if (region) query.append("region", region);
    if (date) query.append("date", date);

    const res = await fetch(`/api/search?${query.toString()}`);
    const data = await res.json();
    // 검색 결과 반영
    setFilteredMeetups(data.meetups);
  }

  // props로 전달된 모임 약속 데이터를 MeetupList에 전달
  return (
    <Fragment>
      <Head>
        <title>Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active meetups"
        />
      </Head>
      <SearchLayout
        sidebar={<SearchBar onSearch={handleSearch} filters={filters} />}
      >
        <MeetupList meetups={filteredMeetups} />
      </SearchLayout>
    </Fragment>
  );
}

// 페이지 사전 생성 시 실행되는 함수 (정적 생성)
export async function getStaticProps() {
  // MongoDB 연결
  const client = await clientPromise;
  const db = client.db();
  // meetups 컬렉션 접근
  const meetupsCollection = db.collection("meetups");
  // 모든 모임 문서 가져오기
  const meetups = await meetupsCollection.find().toArray();

  return {
    props: {
      // 프론트엔드에서 사용할 수 있도록 _id를 문자열로 변환
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        date: meetup.date || null,
        time: meetup.time || null,
        capacity: meetup.capacity || null,
        createdAt: meetup.createdAt ? meetup.createdAt.toString() : null,
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "신촌 저녁 번개 모임",
//     image:
//       "https://lh3.googleusercontent.com/gps-cs-s/AB5caB9gaZ7QemAEFHjKjnWRn9r5tyg0dub7uO37nk2WWZ-8OLxI6FHXSID95SJFwOSgXR-oJQsr6Na6h5K2JDNHmaaWw-sOEoxvA6j3BmL6j0XRPOg7kuhXbUuLNhcHtvomKDEQcvqUYA=s1360-w1360-h1020",
//     address: "서울 서대문구 연세로 12길 34, 커피빈 신촌점",
//     description: "퇴근 후 가볍게 만나 커피 한 잔하며 이야기 나눠요!",
//   },
//   {
//     id: "m2",
//     title: "한강 러닝 크루 모집",
//     image:
//       "https://lh3.googleusercontent.com/gps-cs-s/AB5caB95-FnIUzUO7fB4uU9yyC8WAFzqYE2WeUbo3P6AeKIj5s1pxCZfDtpMnEuvXi_2t7J18oBFScC5vc68E_fjxxAuB47tFRMxWeqM20lMu_ND35ra6HCA0ysNLWgrCYTjb24H_N8L=w270-h312-n-k-no",
//     address: "서울 영등포구 여의도 한강공원",
//     description: "주 2회 함께 러닝하며 건강도 챙기고, 사람도 만나보아요.",
//   },
//   {
//     id: "m3",
//     title: "영화 좋아하는 사람들 모임",
//     image:
//       "https://mblogthumb-phinf.pstatic.net/MjAyNDA1MjRfMTkw/MDAxNzE2NTYxMDk5ODc5.hxZAzfn_ufN6xhrVm63538kICqU0jDlKT16nWpQrO_Ig.eNz9NCit-BoRRh5F4c6Z-GBphtDaIeS_PB3kHLEifEUg.JPEG/SE-59ea4046-485c-4843-ba45-1f53a758eed6.jpg?type=w800",
//     address: "서울 강남구 테헤란로 20길 11, CGV 강남",
//     description: "최신 영화 보고 난 뒤 근처 카페에서 리뷰 나눠요 ☕",
//   },
//   {
//     id: "m4",
//     title: "책 한 권, 대화 한 시간",
//     image:
//       "https://lh3.googleusercontent.com/gps-cs-s/AB5caB81kgk7m5KbA_HGXOKuku4cFj7Rw_oFI4U3x8X_Qc1utIMSiR11wKYv5YZRUFurBpuyAc7Ozx4gYRxR0hsknW64YsUsLxwCYatmKRTnT29oYzFZ8-6tie9iSw-v4V4WQx-xb0o=s1360-w1360-h1020",
//     address: "서울특별시 마포구 잔다리로 112 2층",
//     description: "한 달에 한 권씩 정하고 함께 읽고 이야기 나눕니다.",
//   },
// ];
