'use client';

import { useAuth } from "@/hooks/useAuth";
import Game from "@/components/Game";

export default function GamePage() {
  const { user, loading } = useAuth(true);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-indigo-600 font-bold">Loading...</p>
      </div>
    );
  }

  const safeUser = user ?? undefined;

  return (
    <div className="min-h-screen flex items-center justify-center bg-global">
      <Game user={safeUser} />
    </div>
  );
}
