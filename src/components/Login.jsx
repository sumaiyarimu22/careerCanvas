import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

import { useState } from "react";
import app from "../firebase/firebase.init";
const auth = getAuth(app);
const Login = () => {
  const [userInfo, setUserInfo] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const signinWithGooleHandler = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUserInfo(user);
      })
      .catch((err) => console.error(err));
  };

  const signinWithGithubHandler = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        setUserInfo(user);
      })
      .catch((err) => console.error(err));
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        setUserInfo({});
      })
      .catch(() => {
        setUserInfo({});
      });
  };

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div>
        {userInfo.uid && (
          <div className='flex gap-5 justify-center items-center'>
            <img src={userInfo.photoURL} alt='' className='rounded-full mb-5' />
            <div>
              <h1>
                <span className='font-bold'>name: </span> {userInfo.displayName}
              </h1>
              <h2>
                {" "}
                <span className='font-bold'>email: </span>
                {userInfo.email}
              </h2>
            </div>
          </div>
        )}
        {userInfo.uid ? (
          <button
            onClick={logoutHandler}
            className='border w-full bg-black text-white px-6 py-2 flex items-center gap-3 justify-center'
          >
            LogOut <FaArrowRight />
          </button>
        ) : (
          <div className='flex flex-col gap-5 justify-center items-center'>
            <button
              onClick={signinWithGooleHandler}
              className='border  bg-black text-white px-6 py-2 flex items-center gap-3 justify-center'
            >
              <FcGoogle /> Login with google
            </button>
            <button
              onClick={signinWithGithubHandler}
              className='border  bg-black text-white px-6 py-2 flex items-center gap-3 justify-center'
            >
              <FaGithub />
              Login with github
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
