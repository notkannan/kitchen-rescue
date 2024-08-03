import CardsList from "@/components/CardsList";
import { Box, Container, Typography } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function Dashboard() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <Box
      width='100vw'
      height='100vh'
      sx={{
        bgcolor:'background.default'
      }}
    >
      <Typography>Hi</Typography>
    </Box>
  );
}