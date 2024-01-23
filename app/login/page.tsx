// Signin.js
'use client'
import React, { useState, useEffect } from "react";
import { MdLockOutline, MdOutlineMail } from "react-icons/md";

import { useRouter } from "next/navigation";

import cls from "./Signin.module.css";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

//   const signinHandle = () => {
//       router.push("/product");
//   };

 // Empty dependency array means this effect will only run once on mount

  return (
    <div className={cls.container}>
      <div className={cls.authContainer}>
        <h3>
          <span> BROCHURE SELLER </span>SIGNIN
        </h3>
        <form className={cls.authWrapper} >
          <div className={cls.inputContainer}>
            <MdOutlineMail className={cls.authIcon} />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={cls.inputContainer}>
            <MdLockOutline className={cls.authIcon} />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <a href="/product" className={`${cls.authBtn} ${cls.authBtn2}`} type="submit" >
            SIGN IN
          </a>
          {/* <Link href="/forgot_pass">Forgot password?</Link> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
