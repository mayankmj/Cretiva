import { ProjectForm } from "@/common.types";
import { createProjectMutation, createUserMutation, getUserQuery } from "@/graphql";
// import { Query } from "@grafbase/sdk/dist/src/query";
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

export const uploadImage = async(imagePath: string) =>{
    try {
        // need a backend end point for the api 
        const response = await fetch(`${serverUrl}/api/upload`,{
            method: 'POST',
            body: JSON.stringify({path: imagePath})
        })
        //publish url on the cloudinary is returned
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const fetchToken = async() =>{
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return response.json();
    } catch (error) {
        throw error;
    }
}

// it is called by Project Form on submitting
export const createNewProject =  async(form: ProjectForm,
creatorId: string, token: string) => {
    // upload image to cloudinary
    const imageUrl = await uploadImage(form.image);

    if(imageUrl.url){
        // for user authorization check
        client.setHeader("Authorization",`Bearer ${token}`)
        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId
                }
            }
        }
        return makeGraphQLRequest(createProjectMutation , variables);
    }
}

