import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import AuthForm from "../../components/auth/auth-form";

function SignInPage() {
  const router = useRouter();

  async function handleSignIn({ email, password }) {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.ok) {
      router.replace("/");
    } else {
      return { error: result.error || "로그인 실패" };
    }
  }

  return <AuthForm mode="signin" onSubmit={handleSignIn} />;
}

export default SignInPage;
