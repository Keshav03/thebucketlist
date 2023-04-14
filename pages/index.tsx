import Image from 'next/image'
import Head from 'next/head'
import { useEffect } from 'react'

import {app, auth} from '../firebase/config'

import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import Post from '../components/Post.jsx'

import { getAuth,signInWithPopup,GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"

export default function Home() {

  const provider = new GoogleAuthProvider();
  const [user,loading] = useAuthState(auth)

  const signIn = ()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if(credential!=null){
        const token = credential.accessToken;
      }
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  const signout = ()=>{
    signOut(auth)
    .then(() => {
    }).catch((error) => {
    });

  }

    return (
      <div className='w-[100vw] min-h-[100vh] pb-10 bg-gray-200'>
          <Header user={user} signOut={signout} signIn={signIn}></Header>
          <Hero></Hero>
          <Post user={user} signIn={signIn}></Post>
      </div >
    )

  // if(loading){
  //       return (
  //     <>
  //       <button onClick={signIn} className="bg-lime-300 w-[100px] h-[50px] rounded-xl m-4">Sign in</button>
  //     </>
  //   )
  // }
}