import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { db, auth } from '@/app/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          return {
            id: userCredential.user.uid,
            email: userCredential.user.email,
            name: userCredential.user.displayName,
          };
        } catch (error) {
          console.error('Error during sign in:', error);
          return null;
        }
      }
    })
  ],
  adapter: FirestoreAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };