// 커스텀 훅: 참여 상태 확인 및 참여하기 요청
import { useState, useEffect } from "react";

function useJoinMeetup(meetupId, userId) {
  const [joined, setJoined] = useState(false); // 이미 참여했는지 여부
  const [loading, setLoading] = useState(false); // 참여 버튼 로딩 상태
  const [error, setError] = useState(""); // 에러 메시지

  useEffect(() => {
    async function checkJoined() {
      try {
        const res = await fetch(`/api/participants/participants?meetupId=${meetupId}&userId=${userId}`);
        const data = await res.json();
        setJoined(data.joined);
      } catch (err) {
        setError("참여 상태 확인 실패");
      }
    }
    if (userId) checkJoined();
  }, [meetupId, userId]);

  const join = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/participants/participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetupId, userId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "참여 실패");
      setJoined(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancel = async () => {
    setLoading(true);
    setError("");
  
    try {
      const res = await fetch("/api/participants/participants", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ meetupId, userId }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "참여 취소 실패");
  
      setJoined(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { joined, loading, error, join, cancel };
}

export default useJoinMeetup;