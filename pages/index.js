// 메인 페이지
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "신촌 저녁 번개 모임",
    image:
      "https://lh3.googleusercontent.com/gps-cs-s/AB5caB9gaZ7QemAEFHjKjnWRn9r5tyg0dub7uO37nk2WWZ-8OLxI6FHXSID95SJFwOSgXR-oJQsr6Na6h5K2JDNHmaaWw-sOEoxvA6j3BmL6j0XRPOg7kuhXbUuLNhcHtvomKDEQcvqUYA=s1360-w1360-h1020",
    address: "서울 서대문구 연세로 12길 34, 커피빈 신촌점",
    description: "퇴근 후 가볍게 만나 커피 한 잔하며 이야기 나눠요!",
  },
  {
    id: "m2",
    title: "한강 러닝 크루 모집",
    image:
      "https://lh3.googleusercontent.com/gps-cs-s/AB5caB95-FnIUzUO7fB4uU9yyC8WAFzqYE2WeUbo3P6AeKIj5s1pxCZfDtpMnEuvXi_2t7J18oBFScC5vc68E_fjxxAuB47tFRMxWeqM20lMu_ND35ra6HCA0ysNLWgrCYTjb24H_N8L=w270-h312-n-k-no",
    address: "서울 영등포구 여의도 한강공원",
    description: "주 2회 함께 러닝하며 건강도 챙기고, 사람도 만나보아요.",
  },
  {
    id: "m3",
    title: "영화 좋아하는 사람들 모임",
    image:
      "https://mblogthumb-phinf.pstatic.net/MjAyNDA1MjRfMTkw/MDAxNzE2NTYxMDk5ODc5.hxZAzfn_ufN6xhrVm63538kICqU0jDlKT16nWpQrO_Ig.eNz9NCit-BoRRh5F4c6Z-GBphtDaIeS_PB3kHLEifEUg.JPEG/SE-59ea4046-485c-4843-ba45-1f53a758eed6.jpg?type=w800",
    address: "서울 강남구 테헤란로 20길 11, CGV 강남",
    description: "최신 영화 보고 난 뒤 근처 카페에서 리뷰 나눠요 ☕",
  },
  {
    id: "m4",
    title: "책 한 권, 대화 한 시간",
    image:
      "https://lh3.googleusercontent.com/gps-cs-s/AB5caB81kgk7m5KbA_HGXOKuku4cFj7Rw_oFI4U3x8X_Qc1utIMSiR11wKYv5YZRUFurBpuyAc7Ozx4gYRxR0hsknW64YsUsLxwCYatmKRTnT29oYzFZ8-6tie9iSw-v4V4WQx-xb0o=s1360-w1360-h1020",
    address: "서울특별시 마포구 잔다리로 112 2층",
    description: "한 달에 한 권씩 정하고 함께 읽고 이야기 나눕니다.",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 1
  };
}


// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
  
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }


export default HomePage;
