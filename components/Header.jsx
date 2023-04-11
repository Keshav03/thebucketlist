import { useSession, signIn, signOut } from "next-auth/react"
import TheBucketListLogo from "../public/images/TheBucketListLogo.png"
import Image from "next/image"
import { useEffect } from "react"
import { BiSearchAlt } from 'react-icons/bi';
import Link from 'next/link';


export default function Header({session,signOut}) {
 
    return (
        <div className="relative w-100 h-[10vh] flex flex-row justify-evenly items-center bg-white drop-shadow-md margin-auto">
            <div className="flex justify-center items-center relative w-[250px] h-[10vh]" >
                <Link href="/" ><h1 className="logo text-4xl font-500 font-bold drop-shadow-lg">the BucketList</h1></Link>
            </div>
            <div className="relative w-3/5 h-100 ">
                <BiSearchAlt className="absolute left-[0%] top-[50%] translate-y-[-50%] w-[50px] h-[50%] text-gray-500"></BiSearchAlt>
                <input className="w-[100%] h-[45px] p-4 pl-12 rounded-full bg-gray-200 text-black text-md outline-gray-500 focus:bg-gray-300" placeholder="Search">
                </input>
            </div>
            <div className="flex flex-row justify-between w-[125px]">
                <div className="relative w-[45px] h-[5vh] rounded-full bg-gray-200 ">
                    <Image src={session.data.user.image} alt="logo" layout="fill" className="p-1"></Image>
                </div>
                <button onClick={signOut} className="text-red-500 w-100 hidden md:block">Sign Out</button>
            </div>
        </div>
      )
  
}