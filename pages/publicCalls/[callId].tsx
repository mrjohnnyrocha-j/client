import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import PublicCall from "../../components/Calls/PublicCall/PublicCall"; // Ensure correct import path

const PublicCallPage: React.FC = () => {
  const { query } = useRouter();
  const { data: sessionData, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!sessionData?.user) {
    return <div>Please log in to join the call.</div>;
  }

  if (!query.callId) {
    return <div>Call ID is missing. Please check the URL and try again.</div>;
  }

  return (
    <PublicCall callId={query.callId as string} />
  );
};

export default PublicCallPage;
