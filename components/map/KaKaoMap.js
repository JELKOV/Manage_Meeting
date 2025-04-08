import { useEffect, useState } from "react";

const KakaoMap = ({ address }) => {
  // SDK 로드 여부 상태
  const [mapLoaded, setMapLoaded] = useState(false); 

  useEffect(() => {
    // Kakao Maps SDK가 이미 삽입된 경우 중복 삽입 방지
    const existingScript = document.getElementById("kakao-map-script");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "kakao-map-script";
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API}&autoload=false&libraries=services`;
      script.async = true;

      // SDK 로드 완료 시 지도 초기화
      script.onload = () => {
        window.kakao.maps.load(() => {
          setMapLoaded(true);
        });
      };

      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    // 지도 및 주소 정보가 없으면 렌더링 생략
    if (!mapLoaded || !address) return;

    // 지도 표시할 요소 선택
    const container = document.getElementById("map");

    // 기본 중심 좌표 (서울 시청 기준)
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978),
      level: 3,
    };

    // 지도 객체 생성
    const map = new window.kakao.maps.Map(container, options);
    // 주소 → 좌표 변환용 geocoder 객체
    const geocoder = new window.kakao.maps.services.Geocoder();
    // 장소 검색용 places 객체
    const places = new window.kakao.maps.services.Places();

    // [1차 시도] 도로명 주소 변환
    geocoder.addressSearch(address, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        // 변환 성공 시 지도 중심 이동 및 마커 표시
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        map.setCenter(coords);
        new window.kakao.maps.Marker({ map, position: coords });
      } else {
        // [2차 시도] 키워드 검색 (ex. 장소명이나 상호명)
        places.keywordSearch(address, function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            map.setCenter(coords);
            new window.kakao.maps.Marker({ map, position: coords });
          } else {
            console.error("주소 및 키워드 변환 실패:", address);
          }
        });
      }
    });
  }, [mapLoaded, address]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "10px",
        marginTop: "1rem",
      }}
    />
  );
};

export default KakaoMap;
