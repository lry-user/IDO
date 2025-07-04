import "./index.css";
import { api } from "@/trpc/server";
import IdoContent from "./IDOcontent";
import { teamInfoType } from "@/types/ido";

const IdoPage = async () => {
  const teamInfo = (await api.ido.queryMyTeam()) as teamInfoType;

  return <IdoContent teamInfo={teamInfo} />;
};

export default IdoPage;
