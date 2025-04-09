import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { signOut, useSession } from "next-auth/react";

function MainNavigation() {
  const { data: session, status } = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">🧭 모임의 숲</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">🏠 홈</Link>
          </li>

          {session && (
            <>
              <li>
                <Link href="/new-meetup">📝 모임 등록</Link>
              </li>
              <li>
                <Link href="/user/my-meetups">📂 마이 모임</Link>
              </li>
              <li>
                <button className={classes.logout} onClick={logoutHandler}>
                  🚪 로그아웃
                </button>
              </li>
            </>
          )}

          {!session && status !== "loading" && (
            <>
              <li>
                <Link href="/auth/signin">🔐 로그인</Link>
              </li>
              <li>
                <Link href="/auth/signup">🆕 회원가입</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
