import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  callbacks: {
    async signIn({ user }) {
      try {
        const client = await clientPromise;

        const db = client.db("nutrinest");

        const existingUser = await db.collection("users").findOne({
          email: user.email,
        });

        if (!existingUser) {
          await db.collection("users").insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            createdAt: new Date(),
            pantry: [],
            family: [],
            favorites: [],
          });
        }

        return true;
      } catch (error) {
        console.error("SIGN IN ERROR:", error);
        throw error;
      }
    },
  },
});
