import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

export default function Profile({ params }: { params: { userID: string } }) {
  const { userID } = params;

  return (
    <>
      <h1>Profile Page for User: {userID}</h1>
    </>
  );
}
