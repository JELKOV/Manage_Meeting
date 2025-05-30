import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import AuthForm from "../../components/auth/auth-form";
import { Fragment } from "react";
import Head from "next/head";

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

  return (
    <Fragment>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Login your account" />
      </Head>
      <AuthForm mode="signin" onSubmit={handleSignIn} />;
    </Fragment>
  );
}

export default SignInPage;
