import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '../components/Header.jsx'
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from 'react'

import Hero from '../components/Hero.jsx'
import Post from '../components/Post.jsx'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const session = useSession()
  useEffect(()=>{
    console.log(session)
  })

  if(session.data != null){
    return (
      <div className='w-[100vw] h-auto pb-10'>
          <Header session={session} signOut={signOut}></Header>
          <Hero></Hero>
          <Post></Post>
      </div >
    )
  }else{
    return (
      <>
        <button onClick={() => signIn()} className="bg-lime-300 w-[100px] h-[50px] rounded-xl m-4">Sign in</button>
      </>
    )
  }
}