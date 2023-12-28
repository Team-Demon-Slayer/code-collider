"use client";
import "./globals.css";
import hpMockData from "./my-projects/hpMockData.js";
import mockData from "./project/[projectId]/mock-data";
import HomePage from "./_components/HomePage.jsx";

export default function Home() {
  // const [data, setData] = useState(hpMockData);
  // const [currentProject, setCurrentProject] = useState(mockData.project_meta);
  return (
    <main className="main-container">
      <HomePage data={hpMockData} currentProject={mockData.project_meta[0]} />
    </main>
  );
}
