import Head from "next/head";
import { DashboardProvider } from "../components/dashboard/DashboardContext";
import DashboardWindow from "../components/dashboard/DashboardWindow";
import { ModeProvider } from "../components/dashboard/ModeContext";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Discord Bot Creator</title>
      </Head>
      <ModeProvider>
        <DashboardProvider>
          <DashboardWindow />
        </DashboardProvider>
      </ModeProvider>
    </>
  );
}
