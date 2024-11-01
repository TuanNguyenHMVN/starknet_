import { redirect } from "next/navigation";

export default function Home() {
  redirect("/staking"); // Redirect to /home

  return null; // No content needs to be rendered
}
