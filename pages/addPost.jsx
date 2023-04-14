import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";

import { useRouter } from "next/router";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth, db } from "../firebase/config";

import { addDoc, collection } from "firebase/firestore";

export default function AddPost() {
  const provider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);

  //Input States
  const [state, setState] = useState({
    title: "",
    how: "",
    when: "",
    where: "",
    story: "",
  });

  const { push } = useRouter();

  //Handle input field and set states
  const handleInput = (event) => {
    const target = event.target;
    const value = target.value;
    // if(target.name == "title" && value==""){
    // }
    if (value != "") {
      const name = target.name;
      setState({ ...state, [name]: value });
    }
  };

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
      .then(() => {})
      .catch((error) => {});
  };

  let addPost = async () => {
    console.log(user);
    if (user) {
      try {
        const docRef = await addDoc(collection(db, "posts"), {
          title: state.title,
          how: state.how,
          when: state.when,
          where: state.where,
          completed: false,
          image: ["/../public/images/post1.webp"],
          uid: user.uid,
          story: state.story,
        });
        push("/");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div className="relative w-scfreen  h-[100vh] bg-gray-200">
      <Header user={user} signOut={signout} signIn={signIn}></Header>

      <div className="relative flex flex-col items-center pt-10 w-[60vw] min-h-[600px] bg-white m-auto rounded-xl mt-10 drop-shadow-2xl">
        <input
          name="title"
          onChange={handleInput}
          placeholder="Add Your Title"
          className="w-[60%] text-3xl font-bold border-b-2 border-gray-500 text-gray-500 left-[50%] outline-none"
        ></input>
        <input
          name="how"
          onChange={handleInput}
          placeholder="How you plan to do it? "
          className="relative w-[60%] text-lg font-sm border-b-[1px] border-gray-500 text-gray-300 mt-[50px] outline-none"
        ></input>
        <input
          name="when"
          onChange={handleInput}
          placeholder="When do you plan to do it? "
          className="relative w-[60%] text-lg font-sm border-b-[1px] border-gray-500 text-gray-300 mt-[50px] outline-none"
        ></input>
        <input
          name="where"
          onChange={handleInput}
          placeholder="Where/Location "
          className="relative w-[60%]  text-lg font-sm border-b-[1px] border-gray-500 text-gray-300 mt-[50px] outline-none"
        ></input>
        <input
          name="story"
          onChange={handleInput}
          placeholder="Full Story "
          className="relative w-[60%]  text-lg font-sm border-b-[1px] border-gray-500 text-gray-300 mt-[50px] outline-none"
        ></input>
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          className="mt-[50px] bg-gray-200 rounded-lg"
        ></input>
        <button
          onClick={addPost}
          className="absolute text-lg p-2 bg-[#77DD77] text-center w-[100px] rounded-lg font-bold mt-[50px] bottom-6 right-[50px] text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
