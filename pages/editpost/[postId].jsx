import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import Header from "components/Header.jsx";
import Link from "next/link";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth, db } from "/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

function Post() {
  const provider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);
  const [post, setPost] = useState(null);

  //Input States
  const [state, setState] = useState({
    title: "",
    how: "",
    when: "",
    where: "",
    story: "",
  });

  //Retrieved postId from URL
  const router = useRouter();
  const { push } = useRouter();
  const { postId } = router.query;

  //Sign In Logic
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

  //signOut Logic
  const signout = () => {
    signOut(auth)
      .then(() => {
        setPost(null);
      })
      .catch((error) => {
        throw error;
      });
  };

  //Fetch Single Post from Firebase
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

  //Handle input field and set states
  const handleInput = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setPost({ ...post, [name]: value });
  };

  //Update post on firebase with updated data
  const updatePost = async () => {
    if (user) {
      const update = await updateDoc(doc(db, "posts", postId), {
        title: post.title,
        how: post.how,
        when: post.when,
        where: post.where,
        completed: false,
        uid: user.uid,
        story: post.story,
      });
      push("/");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return (
    <div className="relative w-sreen min-h-[100vh] h-auto bg-gray-200 pb-8">
      <Header user={user} signOut={signout} signIn={signIn}></Header>

      {post ? (
        <div className="relative flex flex-col items-center pt-10 w-[60vw] min-h-[600px] h-auto bg-white m-auto rounded-xl mt-10 drop-shadow-2xl pb-[50px]">
          <input
            placeholder={post.title}
            name="title"
            onChange={handleInput}
            className="w-[70%] text-3xl font-bold border-b-2 border-gray-500 text-gray-500 left-[50%] outline-none "
          ></input>
          <p>{state.title}</p>

          <p className="relative w-[70%] text-lg font-sm border-b-[1px] border-gray-500 text-gray-400 mt-[40px] ">
            How do you plan to do it?
          </p>
          <input
            placeholder={post.how}
            name="how"
            onChange={handleInput}
            className="relative w-[70%] rounded-md p-2 text-lg text-gray-500 mt-[10px] pl-[20px] pb-[20px] bg-[#8BD3E6]/50 outline-none"
          ></input>

          <p className="relative w-[70%] text-lg font-sm border-b-[1px] border-gray-500 text-gray-400 ">
            When do you plan to do it?{" "}
          </p>
          <input
            placeholder={post.when}
            name="when"
            onChange={handleInput}
            className="relative w-[70%] rounded-md p-2 text-lg text-gray-500 mt-[10px] pl-[20px] pb-[20px] bg-[#8BD3E6]/50 outline-none"
          ></input>

          <p className="relative w-[70%]  text-lg font-sm border-b-[1px] border-gray-500 text-gray-400 ">
            Where | Location{" "}
          </p>
          <input
            placeholder={post.where}
            name="where"
            onChange={handleInput}
            className="relative w-[70%] rounded-md p-2 text-lg text-gray-500 mt-[10px] pl-[20px] pb-[20px] bg-[#8BD3E6]/50 outline-none"
          ></input>

          <p className="relative w-[70%]  text-lg font-sm border-b-[1px] border-gray-500 text-gray-400 ">
            Full Story
          </p>
          <textarea
            laceholder={post.story}
            name="story"
            onChange={handleInput}
            className="relative w-[70%] min-h-[150px] text-lg rounded-md p-2  text-gray-500 mt-[10px] pl-[20px] pb-[20px] bg-[#8BD3E6]/50 outline-none"
          >
            {post.story}
          </textarea>

          <p className="relative w-[70%]  text-lg font-sm border-b-[1px] border-gray-500 text-gray-400 ">
            Completed
          </p>
          <input
            type="radio"
            value="true"
            className="relative w-[70%] text-lg rounded-md p-2  text-gray-500 mt-[10px] pl-[20px] pb-[20px]"
          ></input>

          <div className="relative flex flex-row justify-center top-[30px] w-[50%] h-[40px]">
            <button
              onClick={updatePost}
              className=" text-lg p-1 bg-[#77DD77] text-center w-[30%] rounded-lg font-bold text-white"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>no post</div>
      )}
    </div>
  );
}

export default Post;
