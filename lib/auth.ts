// lib/auth.ts
import { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"

// List of authorized GitHub usernames
const AUTHORIZED_USERS = ['prasenjeet066'] // Add more usernames as needed

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if user is authorized
      if (account?.provider === "github") {
        const githubProfile = profile as any
        const username = githubProfile?.login
        
        if (!username || !AUTHORIZED_USERS.includes(username)) {
          console.log(`Unauthorized user attempted to sign in: ${username}`)
          return false
        }
      }
      return true
    },
    async session({ session, token }) {
      // Add GitHub username to session
      if (token.username) {
        session.user.username = token.username
      }
      return session
    },
    async jwt({ token, account, profile }) {
      // Store GitHub username in token
      if (account?.provider === "github") {
        const githubProfile = profile as any
        token.username = githubProfile?.login
      }
      return token
    },
  },
  pages: {
    signIn: '/admin/signin',
    error: '/admin/error',
  },
  session: {
    strategy: "jwt",
  },
  secret: 'SCNxqygOV1kqYOrSNfbaL8tUF+qfYGVb/hdF/yeQco4OrvZ90baYDwUpoqo=',
}