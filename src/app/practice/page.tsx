import Game from "@/components/Game";

export default function PracticePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen pt-24">
      <h1 className="text-3xl font-bold mb-4">Practice Mode</h1>
      <Game />
    </main>
  );
}
