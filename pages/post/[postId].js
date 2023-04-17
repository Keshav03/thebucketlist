import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import Link from "next/link";
import Image from "next/image";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth, db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

function Post() {
  const provider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const [post, setPost] = useState(null);

  const router = useRouter();
  const { postId } = router.query;
  const { push } = useRouter();


  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        setPost(null);
      })
      .catch((error) => {
        throw error;
      });
  };

  const fetchPosts = async () => {
    if (user) {
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        if (doc.data().uid == user.uid) {
          if (doc.id == postId) {
            setPost(doc.data());
          }
        }
      });
    }
  };

  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
    alert("Post had been deleted")
    push("/")
  };


  useEffect(() => {
    fetchPosts();
  }, [user]);

  return (
    <div className="relative w-sreen  h-auto bg-gray-200 pb-[50px]">
      <Header user={user} signOut={signout} signIn={signIn}></Header>

      {post ? (
        <div className="relative flex flex-col items-center pt-10 w-[60vw] min-h-[1000px] h-auto bg-white m-auto rounded-xl mt-10 drop-shadow-2xl pb-[70px]">
          <p className="w-[70%] text-3xl font-bold border-b-2 border-gray-500 text-gray-500 left-[50%] outline-none">
            <span className="font-extrabold">O1.</span> {post.title}
          </p>

          <p className="relative w-[70%] text-lg font-sm border-b-[1px] border-gray-500 text-gray-400 mt-[40px] outline-none">
            How do you plan to do it?
          </p>
          <p className="relative w-[70%] text-lg font-sm text-gray-500 mt-[10px] pl-[20px] pb-[20px]">
            {post.how}
          </p>

          <p className="relative w-[70%] text-lg font-sm border-b-[1px] border-gray-500 text-gray-400 ">
            When do you plan to do it?{" "}
          </p>
          <p className="relative w-[70%] text-lg font-sm text-gray-500 mt-[10px] pl-[20px] pb-[20px]">
            {post.when}
          </p>

          <p className="relative w-[70%]  text-lg font-sm border-b-[1px] border-gray-500 text-gray-400 ">
            Where | Location{" "}
          </p>
          <p className="relative w-[70%] text-lg font-sm text-gray-500 mt-[10px] pl-[20px] pb-[20px]">
            {post.where}
          </p>

          <p className="relative w-[70%]  text-lg font-sm border-b-[1px] border-gray-500 text-gray-400 ">
            Full Story
          </p>
          <p className="relative w-[70%] text-lg font-sm text-gray-500 mt-[10px] pl-[20px] pb-[20px]">
            {post.story}{" "}
          </p>

          <p className="relative w-[70%]  text-lg font-sm border-b-[1px] border-gray-500 text-gray-400 ">
            Completed
          </p>
          {post.completed ? (
            <p className="relative w-[70%]  text-lg font-sm text-gray-400 mt-[10px] pl-[20px] pb-[20px]">
              Yes
            </p>
          ) : (
            <p className="relative w-[70%]  text-lg font-sm text-gray-400 mt-[10px] pl-[20px] pb-[20px]">
              No
            </p>
          )}

          <div className="w-[90%] h-auto mt-8 grid grid-cols-3 gap-8">

            {post.image.map((image,i) => {
                return (
                    <div className="relative h-[150px] bg-gray-100" key={i}>
                        <Image src={image} alt="" layout="fill"></Image>
                    </div>
                )
            })
            }
          </div>

          <div className="relative flex flex-row  justify-evenly items-center top-[40px] w-[50%] h-[40px]">
            <Link
              href="/"
              className=" text-lg p-1 bg-gray-500 text-center w-[30%] rounded-lg font-bold text-white"
            >
              Go Back
            </Link>
            <Link
              href={`/editpost/${postId}`}
              className=" text-lg p-1 bg-[#77DD77] text-center w-[30%] rounded-lg font-bold text-white"
            >
              Edit
            </Link>
            <button
              onClick={() => deletePost(postId)}
              className=" text-lg p-1 bg-red-300 text-center w-[30%] rounded-lg font-bold text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="w-screen h-[90vh] flex justify-center items-center">
          <h2 className="text-5xl font-bold text-red-300">
            POST NOT FOUND or NOT LOGGED IN!{" "}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Post;
