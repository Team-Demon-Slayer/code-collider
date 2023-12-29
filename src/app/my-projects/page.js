"use Client";

import useState from "react";
import hpMockData from "./hpMockData.js";
import UserProjects from "../my-projects/UserProjects.jsx";

export default function MyProjectsPage() {
  // const [data, setData] = useState(null);
  return (
   <UserProjects data={hpMockData} />
  );
};