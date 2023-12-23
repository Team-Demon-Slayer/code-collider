"use client";
import { useRouter } from "next/navigation";

export default function MyProject({ params }) {
  const router = useRouter();

  const goHome = () => {
    router.push("/browse");
  };

  return (
    <div>
      {params.projectId}
      <button onClick={goHome}>Browse</button>
    </div>
  );
}
