'use client'; // Required for client components

import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/staking'); // Navigate to the About page
  };
  return (
    <div className="container text-center">
      <h1 className="text-center mt-5">
        Welcome to Stakestark_ Application!
      </h1>
      <button className="btn btn-primary" onClick={handleNavigate}>Start Staking</button>
    </div>
  );
}
