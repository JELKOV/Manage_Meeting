import { useEffect, useState } from "react";
import classes from "./SearchBar.module.css";
import { useRouter } from "next/router";

/**
 * SearchBar 컴포넌트
 * - 키워드, 지역, 날짜 필터를 입력받아 검색을 수행
 * - props로 전달받은 filters 상태와 내부 input 상태를 동기화
 * - 페이지 이동 시 입력값 초기화 처리
 */
function SearchBar({ onSearch, filters }) {
  // 지역, 날짜, 키워드 검색 상태 (입력창과 바인딩)
  const [keyword, setKeyword] = useState(filters.keyword || "");
  const [region, setRegion] = useState(filters.region || "");
  const [date, setDate] = useState(filters.date || "");

  /**
   * 외부에서 전달된 filters가 변경되면 input 상태도 반영
   * - 예: HomePage에서 필터를 유지하거나 재설정할 때
   */
  useEffect(() => {
    setKeyword(filters.keyword || "");
    setRegion(filters.region || "");
    setDate(filters.date || "");
  }, [filters]);

  /**
   * 검색 실행 핸들러
   * - 현재 입력된 필터 정보를 상위 컴포넌트로 전달
   */
  function submitHandler(e) {
    e.preventDefault();
    onSearch({ keyword, region, date });
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      {/* 지역 선택 드롭다운 */}
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className={classes.select}
      >
        <option value="">전체 지역</option>
        <option value="서울">서울</option>
        <option value="부산">부산</option>
        <option value="대구">대구</option>
        <option value="인천">인천</option>
        <option value="광주">광주</option>
        <option value="대전">대전</option>
        <option value="울산">울산</option>
        <option value="세종">세종</option>
        <option value="경기">경기</option>
        <option value="강원">강원</option>
        <option value="충북">충북</option>
        <option value="충남">충남</option>
        <option value="전북">전북</option>
        <option value="전남">전남</option>
        <option value="경북">경북</option>
        <option value="경남">경남</option>
        <option value="제주">제주</option>
      </select>

      {/* 날짜 필터 */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className={classes.date}
      />

      {/* 키워드 검색창 */}
      <input
        type="text"
        value={keyword}
        placeholder="모임 제목, 설명, 주소 검색"
        onChange={(e) => setKeyword(e.target.value)}
        className={classes.input}
      />

      {/* 검색 버튼 */}
      <button type="submit" className={classes.button}>
        🔍 검색
      </button>
    </form>
  );
}

export default SearchBar;
