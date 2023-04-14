import React from 'react'
import Image from 'next/image'
import HeroBg from '../public/images/hero3.jpeg'

function Hero() {
  return (
    <div>
        <div className='relative m-auto w-[100vw] h-[50vh]'>
            <Image src={HeroBg} alt="" layout="fill" className='drop-shadow-4xl'></Image>
            <div className='absolute w-[100vw] h-[50vh] bg-black opacity-60'>
            </div>
            <h2 className='absolute text-4xl text-white z-5 text-center top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] tracking-widest	'>WELCOME  TO <br></br><span className='text-8xl text-white-300 font-bold tracking-wider'> The Bucket List</span></h2>
        </div>
    </div>
  )
}

export default Hero