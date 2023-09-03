import { createUserMutation, getUserQuery } from "@/graphql";
import { Query } from "@grafbase/sdk/dist/src/query";
import { GraphQLClient } from "graphql-request";


const isProduction = process.env.NODE_ENV === 'production'

const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' 
: 'http://127.0.0.1:4000/graphql'

const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' :
'My name is  Mayank'

const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL || '' :
'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string,variables = {}) =>{
    try {
        // client.request..
        return await client.request(query,variables);
    } catch (error) {
        throw error
    }
}

export const getUser = (email:string) => {
    client.setHeader('x-api-key',apiKey);
    return makeGraphQLRequest(getUserQuery ,{email});
}
// it makes a "makegraphqlrequesl" => it make a requst to clinet
// client request moved overapi url which is either env or localhost one
// in return it returns us a User with all the details we specified in the graphql/index.ts

export const createUser = (name: string, email:string, avatarUrl: string) => {
     client.setHeader('x-api-key',apiKey);
    const variables = {
        input: {
            name,email,avatarUrl
        }
    }
        return makeGraphQLRequest(createUserMutation ,variables);
}

