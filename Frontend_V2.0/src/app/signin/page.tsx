import Link from "next/link";

import { Metadata } from "next";
import { Forum } from "next/font/google";
import Signin from "@/components/Signin";
import { useRouter } from 'next/navigation'


export const metadata: Metadata = {
  title: "Sign In Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign In Page for Startup Nextjs Template",
  // other metadata
};

const SigninPage = () => {
  

  return (
    <>
      <Signin></Signin>
    </>
  );
};

export default SigninPage;
