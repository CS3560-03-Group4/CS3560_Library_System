"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/sign-in");
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-3xl font-bold">Home page</h1>
        <Button className="text-white rounded-xl" onClick={handleLogout}>
          Log out
        </Button>
      </main>
    </>
  );
}
