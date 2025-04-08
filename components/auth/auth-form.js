import { useRef, useState } from "react";
import Link from "next/link";
import classes from "./auth-form.module.css";

function AuthForm({ mode, onSubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    setError("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const result = await onSubmit({ email, password });

    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h1>{mode === "signin" ? "Login" : "Sign Up"}</h1>
      <div>
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" required ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" required ref={passwordRef} />
      </div>

      {error && <p>{error}</p>}

      <button>{mode === "signin" ? "로그인" : "회원가입"}</button>

      <p className={classes.switch}>
        {mode === "signin" ? (
          <>
            <span>아직 아이디가 없으신가요?</span>
            <br />
            <Link href="/auth/signup">
              <span className={classes.cta}>👉 회원가입 하로 가기</span>
            </Link>
          </>
        ) : (
          <>
            <span>이미 아이디가 있으신가요?</span>
            <br />
            <Link href="/auth/signin">
              <span className={classes.cta}>👉 로그인 하로 가기</span>
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

export default AuthForm;
