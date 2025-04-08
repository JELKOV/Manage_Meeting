import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/db";
import { compare } from "bcryptjs";

// ✅ authOptions를 export 해서 다른 곳에서 사용할 수 있도록 설정
export const authOptions = {
  session: {
    strategy: "jwt", // JWT 기반 세션 전략
  },
  providers: [
    CredentialsProvider({
      // 🔐 로그인 시 사용자 인증 로직
      async authorize(credentials) {
        const client = await clientPromise;
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({ email: credentials.email });

        if (!user) throw new Error("사용자가 존재하지 않습니다.");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("비밀번호가 일치하지 않습니다.");

        // ✅ 로그인 성공 시 세션에 담길 데이터 반환
        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // 커스텀 로그인 페이지 경로
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
