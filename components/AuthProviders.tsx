"use client"; 
// use to declare client component in server componenet
// or we can make a client server seperately then export in the code

// hooks cant be render on server side becoz they render client side functionality
import {useState , useEffect} from 'react';

import {getProviders , signIn} from 'next-auth/react';

type Provider = {
  id:string;
  name: string;
  type:string;
  signinUrl:string;
  callbackUrl:string;
  signinUrlParams?:Record<string, string> | null;
  // ? denotes optional 
}

type Providers = Record<string,Provider>;
const AuthProviders = () => {
  // | denote unione and initial value is written aftet ">" 
  const[providers,setProviders] = useState<Providers  | null > (null);
  
  useEffect( () =>{
    const fetchProviders = async () =>{
      const res = await getProviders();
      console.log(res);
      
     setProviders(res);
    }
    fetchProviders();
  },[])
  //checking is Provider is present or not
  if(providers){
     return (
      <div>
        {Object.values(providers).map
        ((provider: Provider,i) =>(
          <button key={i} onClick = { () => signIn(provider?.id)}>{provider.id}</button>
        ))}
      </div>
   )
  }
}

export default AuthProviders