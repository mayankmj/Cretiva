import { getServerSession } from "next-auth";
import { NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt';
console.log(process.env.GOOGLE_CLIENT_ID);
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            // ! describing as it can be NULL also
            
            
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    // jwt: {
    //     encode: async(secret, token) =>{

    //     },
    //     decode: async (secret, token) =>{

    //     }
    // },
    theme: {
        colorScheme: 'light',
        // logo: '/logo',
    },
    callbacks:{
        async session({session}) {

        },
        async signIn({user} : { user: AdapterUser | User}) { // adatpuser checks for google auth user and User is login with email pass user
           try {
              // get the user if exist

              // create the user if dont exist 

              // return the user
              return true   
           } catch (error: any) {
              console.log(error);  
              return false
           }
        },
    }

}