import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./lib/db"
import User from "./models/user.model"
import bcrypt from "bcryptjs"
import Google from "next-auth/providers/google"
 
// @ts-ignore
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
  credentials: {
    email: {
      type: "email",
      label: "Email",
      placeholder: "johndoe@gmail.com",
    },
    password: {
      type: "password",
      label: "Password",
      placeholder: "*****",
    },
  },
    async authorize(credentials,request) {
      if (!credentials.email || !credentials.password) {
        throw new Error("missing credentials")
      }
      const email = credentials.email 
      const password = credentials.password as string
      await connectDb()
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error("user doesn't exist")
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        throw new Error("icorrect password")
      }
      return {
         id:user._id,
         name:user.name,
        email:user.email,
         role:user.role

      }
     
    }
  }),
  Google({
    clientId:process.env.AUTH_GOOGLE_ID,
    clientSecret:process.env.AUTH_GOOGLE_SECRET,
  })
  ],
  callbacks: {
    async signIn({user,account}: {user: any; account: any}){
      if(account?.provider=="google"){
        await connectDb()
        let dbUser = await User.findOne({email:user.email})
        if(!dbUser){
          await User.create({
            name:user.name,
            email:user.email
          })
        }

        user.id = dbUser._id.toString()
        user.role = dbUser.role
      }
      return true
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.role = user.role
      }

      return token
    },
    async session({ token, session }: { token: any; session: any }) {
      if(session.user){
      session.id = token.id as string
      session.name = token.name
      session.email = token.email as string
      session.role = token.role as string

      }

      return session
    }
  },
  pages:{
    signIn:"/signin",
    error:"/signin"
  },
  session:{
    strategy:"jwt",
    maxAge:10*24*60*60
  },
  secret:process.env.AUTH_SECRET

})