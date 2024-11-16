import OrderTable from "@/components/profile/OrderTable";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { Divider, Grid2 } from "@mui/material";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
};

export default function Profile({ params }: { params: { userID: string } }) {
  const { userID } = params;

  return (
    <>
      <Grid2 container padding={2}>
        {/* Left Banner */}
        <Grid2 size={{ xs: 12, md: 2 }}>
          <ProfileInfo userID={userID} />
        </Grid2>
        <Grid2>
          <Divider
            orientation="vertical"
            variant="middle"
            sx={{ margin: "0 2rem 0 0" }}
            className="min-h-svh hidden lg:block"
          />
        </Grid2>

        {/* Right Area with Form */}
        <Grid2 size={{ xs: 12, md: 8 }}>
          <h1 className="text-3xl font-bold">Order History</h1>
          <div className="mt-4">
            <OrderTable />
          </div>
          <h1 className="mt-4 text-3xl font-bold">Overdue Payment</h1>
        </Grid2>
      </Grid2>
    </>
  );
}
