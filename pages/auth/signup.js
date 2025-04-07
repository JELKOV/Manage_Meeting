import { useRouter } from "next/router";
import AuthForm from "../../components/auth/auth-form";

function SignUpPage() {
  const router = useRouter();

  async function handleSignUp({ email, password }) {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.message || "회원가입 실패" };
    }

    router.replace("/auth/signin"); // 가입 후 로그인 페이지로 이동
  }

  return <AuthForm mode="signup" onSubmit={handleSignUp} />;
}

export default SignUpPage;
