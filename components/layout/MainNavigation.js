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
      <div className={classes.logo}>Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href="/">All Meetups</Link>
          </li>
          <li>
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
          {!session && status !== "loading" && (
            <>
              <li>
                <Link href="/auth/signin">Login</Link>
              </li>
              <li>
                <Link href="/auth/signup">Signup</Link>
              </li>
            </>
          )}
          {session && (
            <li>
              <button className={classes.logout} onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
