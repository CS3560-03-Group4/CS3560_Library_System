"use client";

import { useEffect, useState } from "react";

export default function ProfileInfo({ userID }: { userID: string }) {
  const [userInfo, setUserInfo] = useState({
    broncoID: "",
    firstName: "",
    lastName: "",
    major: "",
    email: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/user/${userID}`);
        const user = await response.json();
        console.log(user);
        if (user) {
          setUserInfo({
            broncoID: user.studentID,
            firstName: user.firstName,
            lastName: user.lastName,
            major: user.major,
            email: user.email,
          });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4 ">
        <h1 className="text-4xl font-bold mb-3">
          {userInfo.firstName + " " + userInfo.lastName}
        </h1>
        <div>
          <h3 className="font-semibold text-xl">BroncoID</h3>
          <p>{userInfo.broncoID}</p>
        </div>
        <div>
          <h3 className="font-semibold text-xl">Major</h3>
          <p>{userInfo.major}</p>
        </div>
        <div>
          <h3 className="font-semibold text-xl">Email</h3>
          <p>{userInfo.email}</p>
        </div>
      </div>
    </>
  );
}
