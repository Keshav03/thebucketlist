import React from 'react'
import {BiAddToQueue} from 'react-icons/bi'
import Link from 'next/link';
import Image from 'next/image';

export default function Post() {

  const postList = [{
                    title:"Sky Diving",
                    image:"/../public/images/post1.webp"
                },
                {
                  title:"Karting",
                  image:"/../public/images/post2.jpeg"
                },
                {
                  title:"Dream Car",
                  image:"/../public/images/post3.webp"
                },
               ]

  return (
    <div className='w-[90vw] m-auto mt-6 '>
        <div className="relative w-[100%] h-[150px] bg-gray-100 rounded-md p-4 cursor-pointer hover:bg-gray-300 ">
            <Link href="/addPost" ><BiAddToQueue className='w-[100%] h-[100%]'/></Link>
        </div>
        <div className="relative flex flex-row justify-between w-[100%] h-[250px] mt-6 pb-6">
            {postList.map(({title,image},i)=>{
              console.log(i)
                return(
                    <div className="relative w-[20%] h-[100%]  m-2 cursor-pointer " >
                      <div className='relative w-[100%] h-[80%] bg-gray-200 rounded-lg hover:opacity-50' >
                        <Image src={image} alt="" layout="fill"></Image>
                        <p className='absolute bottom-4 right-4 text-7xl font-bold text-white'>0{i+1}</p>
                      </div>
                      <p className='text-xl font-extrabold tracking-widest mt-3 text-gray-700 uppercase'>{title}</p>
                    </div>
                )
            })

          }

        </div>


    </div>
  )
}

