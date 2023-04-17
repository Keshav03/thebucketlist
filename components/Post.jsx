import React, { useEffect, useState } from "react";
import { BiAddToQueue, BiLink } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

import { collection, getDocs, doc, deleteDoc  } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Post({ user, signIn }) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    if (user) {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const retrievedPost = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().uid == user.uid) {
          const newData = doc.data();
          newData["postId"] = doc.id;
          retrievedPost.push(newData);
        }
      });
      setPosts(retrievedPost);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
    fetchPosts()
  };

  return (
    <div className="w-[90vw] h-auto m-auto mt-6">
      {user ? (
        <>
          <div className="relative w-[25%] h-[50px] flex flex-row justify-between items-center rounded-md p-4">
            <h2 className="uppercase text-3xl text-gray-500 tracking-widest font-bold ">
              Lists{" "}
            </h2>
            <div className="w-[50%] text-[#78BE21]  h-[100%] p-6 flex flex-row items-center justify-between rounded-lg border-b-2 cursor-pointer ">
              <Link
                href="/addPost"
                className="w-[100%] flex flex-row items-center justify-between inline"
              >
                <p className="font-bold tracking-widest text-sm ">Add New</p>
                <BiAddToQueue className="w-auto h-[30px]" />
              </Link>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-500 tracking-widest uppercase mt-6 text-red-400">
            Pending
          </h2>

          <div className="relative grid grid-cols-3 gap-6 auto-rows-auto w-[100%] h-auto mt-6 pb-6">
            {posts.map(({ postId, title, image, completed }, i) => {
              return (
                <div
                  className="relative h-[250px]  m-2 cursor-pointer "
                  key={i}
                >
                  {!completed ? (
                    <div className="relative w-[100%] h-[80%] bg-gray-200 rounded-lg">
                    <Link href={`/post/${postId}`}>
                      <div className="relative w-[100%] h-[80%] bg-gray-200 rounded-lg">
                        <div className="relative w-[100%] h-[100%] ">
                          <Image src={image[0]} alt="" layout="fill"></Image>
                        </div>
                        <p className="absolute bottom-4 right-4 text-7xl font-bold text-white">
                          0{i + 1}
                        </p>
                      </div>
                      </Link>
                      <div className="flex flex-row justify-between items-center text-black p-3">
                        <p className="text-xl font-extrabold tracking-widest text-gray-700 uppercase">
                          {title}
                        </p>
                        <div className="flex flex-row w-[50%] justify-between">
                          <Link 
                              href={`/editpost/${postId}`}
                              className="text-md tracking-widest bg-[#78BE21]/50 px-2 py-1 rounded-lg hover:text-white">
                            Edit{" "}
                            <AiOutlineEdit className="inline w-[20px] h-[20px]"></AiOutlineEdit>
                          </Link>
                          <button className="text-md tracking-widest bg-red-300 px-2 py-1 rounded-lg hover:text-white" onClick={()=> deletePost(postId)} >
                            Delete{" "}
                            <AiOutlineDelete className="inline w-[20px] h-[20px]"></AiOutlineDelete>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>

          <h2 className="text-xl font-bold tracking-widest uppercase mt-6 text-[#77DD77]">
            Completed
          </h2>

          <div className="relative grid grid-cols-3 gap-6 auto-rows-auto w-[100%] h-auto mt-6 pb-6">
            {posts.map(({ postId, title, image, completed }, i) => {
              return (
                <div
                  className="relative h-[250px]  m-2 cursor-pointer "
                  key={i}
                >
                  {completed ? (
                    <Link href={`/post/${postId}`}>
                      <div className="relative w-[100%] h-[80%] bg-gray-200 rounded-lg">
                        <div className="relative w-[100%] h-[100%] ">
                          <Image src={image[0]} alt="" layout="fill"></Image>
                        </div>
                        <p className="absolute bottom-4 right-4 text-7xl font-bold text-white">
                          0{i + 1}
                        </p>
                      </div>
                      <div className="flex flex-row justify-between items-center text-black p-3">
                        <p className="text-xl font-extrabold tracking-widest text-gray-700 uppercase">
                          {title}
                        </p>
                        <div className="flex flex-row w-[50%] justify-between">
                          <button className="text-lg tracking-widest hover:text-blue-400">
                            Edit{" "}
                            <AiOutlineEdit className="inline w-[20px] h-[20px]"></AiOutlineEdit>
                          </button>
                          <button className="text-lg tracking-widest hover:text-red-300">
                            Delete{" "}
                            <AiOutlineDelete className="inline w-[20px] h-[20px]"></AiOutlineDelete>
                          </button>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div
          className="flex justify-evenly items-center m-auto mt-[5%] w-[25%] rounded-lg p-4 cursor-pointer hover:bg-[#77DD77]"
          onClick={signIn}
        >
          <FcGoogle className="w-[10%] h-[10%] "> </FcGoogle>
          <p className="text-xl font-bold">Sign In with Google</p>
        </div>
      )}
    </div>
  );
}
