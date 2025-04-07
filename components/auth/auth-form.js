import { useRef, useState } from "react";
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
      <h1>{mode === "signin" ? "Login" : "Signup"}</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" required ref={emailRef} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" required ref={passwordRef} />
      </div>
      {error && <p>{error}</p>}
      <button>{mode === "signin" ? "Login" : "Signup"}</button>
    </form>
  );
}

export default AuthForm;
