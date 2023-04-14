import React, { useEffect,useState } from 'react'
import {BiAddToQueue} from 'react-icons/bi'
import { FcGoogle } from 'react-icons/fc'
import {AiOutlineEdit} from 'react-icons/ai'
import Link from 'next/link';
import Image from 'next/image';

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"

export default function Post({user,signIn}) {

    const [posts,setPosts ] = useState([])
  
    useEffect(() => {
        const fetchPosts = async () => {
          if(user){
              const querySnapshot = await getDocs(collection(db, "posts"));
              const retrievedPost = []
              querySnapshot.forEach((doc) => {
                if(doc.data().uid == user.uid){
                    const newData = doc.data()
                    newData["postId"] = doc.id
                    retrievedPost.push(newData)
                }
              });
              setPosts(retrievedPost)
              console.log(retrievedPost)
        }
        }
        fetchPosts();
    },[user]);

  return (
    
    <div className='w-[90vw] h-auto m-auto mt-6'>
      {user?
        <>
            <div className="relative w-[100%] h-[150px] bg-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-400 ">
                <Link href="/addPost" ><BiAddToQueue className='w-[100%] h-[100%]'/></Link>
            </div>

            <h2 className='text-xl font-bold text-gray-500 tracking-widest uppercase mt-6 text-red-400'>Pending</h2>

            <div className="relative grid grid-cols-3 gap-6 auto-rows-auto w-[100%] h-auto mt-6 pb-6">
                {posts.map(({postId,title,image},i)=>{
                    return(
                        <div className="relative h-[250px]  m-2 cursor-pointer " key={i}>
                          <Link href ={`/post/${postId}`} >
                          <div className='relative w-[100%] h-[80%] bg-gray-200 rounded-lg' >
                            <div className='relative w-[100%] h-[100%] ' > 
                              <Image src={image[0]} alt="" layout="fill"></Image>
                            </div>
                            <p className='absolute bottom-4 right-4 text-7xl font-bold text-white'>0{i+1}</p>
                          </div>
                          <div className='flex flex-row justify-between items-center text-black p-3'>
                            <p className='text-xl font-extrabold tracking-widest text-gray-700 uppercase'>{title}</p>
                            <p className='text-lg tracking-widest hover:text-blue-400'>Edit <AiOutlineEdit className='inline w-[20px] h-[20px]'></AiOutlineEdit></p>
                          </div>
                          </Link>
                        </div>
                    )
                })}  

            </div>

            <h2 className='text-xl font-bold text-gray-500 tracking-widest uppercase mt-6 text-[#77DD77]'>Completed</h2>

            <div className="relative grid grid-cols-3 gap-6 auto-rows-auto w-[100%] h-auto mt-6 pb-6">
                {posts.map(({postId,title,image,completed},i)=>{
                    return(
                        <div className="relative h-[250px]  m-2 cursor-pointer " key={i}>
                          <Link href ={`/post/${postId}`} >
                          <div className='relative w-[100%] h-[80%] bg-gray-200 rounded-lg' >
                            <div className='relative w-[100%] h-[100%] ' > 
                              <Image src={image[0]} alt="" layout="fill"></Image>
                            </div>
                            <p className='absolute bottom-4 right-4 text-7xl font-bold text-white'>0{i+1}</p>
                          </div>
                          <div className='flex flex-row justify-between items-center text-black p-3'>
                            <p className='text-xl font-extrabold tracking-widest text-gray-700 uppercase'>{title}</p>
                            <p className='text-lg tracking-widest hover:text-blue-400'>Edit <AiOutlineEdit className='inline w-[20px] h-[20px]'></AiOutlineEdit></p>
                          </div>
                          </Link>
                        </div>
                    )
                })}  

            </div>




        </>
        :
          <div className='flex justify-evenly items-center m-auto mt-[5%] w-[25%] bg-white rounded-lg p-4 cursor-pointer hover:bg-[#77DD77]' onClick={signIn}>
              <FcGoogle className='w-[10%] h-[10%] '> </FcGoogle>
              <p className='text-xl font-bold'>Sign In with Google</p>
          </div>
      }


    </div>
  )
}

