import { useSession, signIn, signOut } from "next-auth/react"

import Image from "next/image"
import { useEffect } from "react"
import Header from '../components/Header.jsx'


export default function AddPost() {
 
    const session = useSession()
    console.log(session)

    useEffect(()=>{
        console.log(session)
      })

    return (
        <div className="relative">

            {session.data?
            <Header session={session} signOut={signOut}></Header>
            :
            <div>
                <button onClick={() => signIn()} className="bg-lime-300 w-[100px] h-[50px] rounded-xl m-4">Sign in</button>
            </div>
            }
        </div>
      )
}