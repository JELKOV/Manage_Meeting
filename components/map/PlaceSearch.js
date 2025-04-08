import { useEffect } from "react";

const PlaceSearch = ({ onSelectAddress }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("placeMap");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapContainer, options);
        const ps = new window.kakao.maps.services.Places();

        const input = document.getElementById("placeKeyword");
        const searchBtn = document.getElementById("searchBtn");

        searchBtn.onclick = () => {
          const keyword = input.value;
          if (!keyword.trim()) return alert("검색어를 입력해주세요!");
          ps.keywordSearch(keyword, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const bounds = new window.kakao.maps.LatLngBounds();
              map.setLevel(4); // 줌 레벨 조정

              data.forEach(place => {
                const position = new window.kakao.maps.LatLng(place.y, place.x);
                const marker = new window.kakao.maps.Marker({
                  map,
                  position,
                });

                window.kakao.maps.event.addListener(marker, "click", () => {
                  const addr = place.road_address_name || place.address_name;
                  if (onSelectAddress) onSelectAddress(addr);
                });

                bounds.extend(position);
              });

              map.setBounds(bounds);
            }
          });
        };
      });
    };

    document.head.appendChild(script);
  }, [onSelectAddress]);

  return (
    <div>
      <input id="placeKeyword" type="text" placeholder="장소 키워드 검색" />
      <button type="button" id="searchBtn">검색</button>
      <div
        id="placeMap"
        style={{ width: "100%", height: "300px", marginTop: "1rem" }}
      />
    </div>
  );
};

export default PlaceSearch;
