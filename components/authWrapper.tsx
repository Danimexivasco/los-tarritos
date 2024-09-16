"use client"
import React, { useState } from "react"
import Button from "@/components/button";
import Link from "@/components/link";
import Input from "@/components/input";
import { useRouter } from "next/navigation";
import { createUser, logIn } from "@/services/auth";
import { AUTH_ROUTES } from "@/utils/routes";

export interface AuthWrapperProps {
  screen: "login" | "register"
}

const AuthWrapper = ({ screen = "login" }:AuthWrapperProps) => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;
    switch (type) {
    case "email":
      return setEmail(value)
    case "password":
      return setPassword(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (screen === "login") {
      try {
        await logIn(email, password)
        return router.push("/")
      } catch (error) {
        console.log(error);
      }
    } else if (screen === "register") {
      try {
        await createUser(email, password)
        return router.push("/")
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className="grid place-items-center h-[calc(100vh-7rem)] md:h-[calc(100vh-7.5rem)]">
      <div className="md:w-[40vw] max-w-96">
        <h1 className="text-4xl pb-6 text-center"> {screen === "login" ? "Login": "Register" }</h1>
        <form className="grid gap-6 my-4" onSubmit={handleSubmit}>
          <Input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <Input
            required
            minLength={6}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          {screen === "login" ?
            <Button text="Login" />
            :
            <Button text="Register"/>
          }
        </form>
        {screen === "login" ?
          <p className="pt-4 text-center">You don&apos;t have an account? <Link href={AUTH_ROUTES.REGISTER}>Register here</Link></p>
          :
          <p className="pt-4 text-center">You already have an account? <Link href={AUTH_ROUTES.LOGIN}>Log in</Link></p>
        }
      </div>
    </section>
  )
}

export default AuthWrapper